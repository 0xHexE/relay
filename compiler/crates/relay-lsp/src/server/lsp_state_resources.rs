/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

use std::{
    collections::HashMap,
    sync::{atomic::AtomicI8, atomic::Ordering, Arc, RwLock},
};

use common::{PerfLogEvent, PerfLogger};
use crossbeam::Sender;
use graphql_ir::Program;
use interner::StringKey;
use log::{debug, info};
use lsp_server::Message;
use relay_compiler::{
    compiler::Compiler, compiler_state::CompilerState, config::Config, errors::Error, FileSource,
    FileSourceResult, FileSourceSubscription, FileSourceSubscriptionNextChange,
};
use schema::SDLSchema;
use tokio::{sync::Notify, task, task::JoinHandle};

use crate::{
    diagnostic_reporter::DiagnosticReporter,
    lsp::set_ready_status,
    lsp::update_in_progress_status,
    lsp_process_error::{LSPProcessError, LSPProcessResult},
};

#[derive(Clone, Default)]
/// This structure is representing the state of the current source control update
/// Watchman subscription will trigger updates here
struct SourceControlUpdateStatus {
    // default - no updates
    // 1 - update started
    // 2 - update completed
    value: Arc<AtomicI8>,
}

impl SourceControlUpdateStatus {
    fn mark_as_started(&self) {
        debug!("SourceControlUpdateStatus: source control update started!");
        self.value.store(1, Ordering::Relaxed);
    }
    fn is_started(&self) -> bool {
        self.value.load(Ordering::Relaxed) == 1
    }
    fn mark_as_completed(&self) {
        debug!("SourceControlUpdateStatus: source control update completed!");
        self.value.store(2, Ordering::Relaxed);
    }
    fn is_completed(&self) -> bool {
        self.value.load(Ordering::Relaxed) == 2
    }
}

/// This structure is responsible for keeping schemas/programs in sync with the current state of the world
pub(crate) struct LSPStateResources<TPerfLogger: PerfLogger + 'static> {
    config: Arc<Config>,
    perf_logger: Arc<TPerfLogger>,
    schemas: Arc<RwLock<HashMap<StringKey, Arc<SDLSchema>>>>,
    source_programs: Arc<RwLock<HashMap<StringKey, Program>>>,
    compiler: Compiler<TPerfLogger>,
    errors: Arc<RwLock<Vec<String>>>,
    source_code_update_status: SourceControlUpdateStatus,
    notify_sender: Arc<Notify>,
    notify_receiver: Arc<Notify>,
    sender: Sender<Message>,
    diagnostic_reporter: DiagnosticReporter,
}

impl<TPerfLogger: PerfLogger + 'static> LSPStateResources<TPerfLogger> {
    pub(crate) fn new(
        config: Arc<Config>,
        perf_logger: Arc<TPerfLogger>,
        schemas: Arc<RwLock<HashMap<StringKey, Arc<SDLSchema>>>>,
        source_programs: Arc<RwLock<HashMap<StringKey, Program>>>,
        sender: Sender<Message>,
    ) -> Self {
        let compiler = Compiler::new(Arc::clone(&config), Arc::clone(&perf_logger));
        let notify_sender = Arc::new(Notify::new());
        let notify_receiver = notify_sender.clone();

        let diagnostic_reporter = DiagnosticReporter::new(config.root_dir.clone(), sender.clone());

        Self {
            config,
            perf_logger,
            schemas,
            source_programs,
            compiler,
            errors: Default::default(),
            sender,
            source_code_update_status: Default::default(),
            notify_sender,
            notify_receiver,
            diagnostic_reporter,
        }
    }

    /// Create an end-less loop of keeping the resources up-to-date with the source control changes
    pub(crate) async fn watch(&self) -> LSPProcessResult<()> {
        'outer: loop {
            info!("Initializing resources for LSP server");

            update_in_progress_status(
                "Relay: watchman...",
                Some("Sending watchman query to get source files and possible saved state"),
                &self.sender,
            );
            let setup_event = self
                .perf_logger
                .create_event("lsp_state_initialize_resources");
            let timer = setup_event.start("lsp_state_initialize_resources_time");

            let file_source = FileSource::connect(&self.config, &setup_event)
                .await
                .map_err(LSPProcessError::CompilerError)?;
            let (mut compiler_state, file_source_subscription) = file_source
                .subscribe(&setup_event, self.perf_logger.as_ref())
                .await
                .map_err(LSPProcessError::CompilerError)?;

            let pending_file_source_changes =
                Arc::clone(&compiler_state.pending_file_source_changes);

            // Start a separate task to receive watchman subscription updates
            // this process will notify, when the change is detected.
            // If watchman detects the source control update, it will update the state
            // of the source_control_update_status, so we can cancel building schemas/
            // and programs earlier
            let subscription_handle = self.watchman_subscription_handler(
                file_source_subscription,
                pending_file_source_changes,
            );
            update_in_progress_status(
                "Relay: creating state...",
                Some("Building schemas and source programs for LSP"),
                &self.sender,
            );

            self.diagnostic_reporter.clear_diagnostics();

            // Run initial build, before entering the watch changes loop
            if let Err(err) = self.initial_build(&compiler_state, &setup_event) {
                self.report_error(err);
            }
            compiler_state.complete_compilation();

            setup_event.stop(timer);
            self.perf_logger.complete_event(setup_event);

            self.publish_errors("lsp_state_error");
            set_ready_status(&self.sender);

            info!("LSP server initialization completed!");


            // Here we will wait for changes from watchman
            'inner: loop {
                self.notify_receiver.notified().await;

                // Source control update started, we can ignore all pending changes, and wait for it to complete,
                // we may change the status bar to `Source Control Update...`
                if self.source_code_update_status.is_started() {
                    update_in_progress_status(
                        "Relay: hg update...",
                        Some("Waiting for source control update"),
                        &self.sender,
                    );
                    break 'inner;
                }

                // SC Update completed, we need to abort current subscription, and re-initialize resource for LSP
                if self.source_code_update_status.is_completed() {
                    debug!("Watchman indicated the the source control update has completed!");
                    subscription_handle.abort();
                    continue 'outer;
                }

                let log_event = self.perf_logger.create_event("lsp_state_watchman_event");
                let log_time = log_event.start("lsp_state_watchman_event_time");

                if let Err(error) = self.incremental_build(&mut compiler_state, &log_event) {
                    self.report_error(error);
                }

                log_event.stop(log_time);
                self.perf_logger.complete_event(log_event);
                self.perf_logger.flush();

                self.publish_errors("lsp_state_user_error");

                set_ready_status(&self.sender);
            }
        }
    }

    fn incremental_build(
        &self,
        compiler_state: &mut CompilerState,
        log_event: &impl PerfLogEvent,
    ) -> Result<(), Error> {
        let has_new_changes = compiler_state.merge_file_source_changes(
            &self.config,
            log_event,
            self.perf_logger.as_ref(),
            false,
        )?;

        // If changes contains schema files we need to rebuild schemas
        if has_new_changes {
            info!("LSP server detected changes...");

            self.diagnostic_reporter.clear_diagnostics();

            update_in_progress_status(
                "Relay: checking...",
                Some("Validating changes, and updating source programs with the latest changes."),
                &self.sender,
            );

            if compiler_state.has_schema_changes() {
                self.build_schemas(compiler_state, log_event)?;
            }

            self.build_source_programs(&compiler_state, log_event)?;

            compiler_state.complete_compilation();
        }

        Ok(())
    }

    fn initial_build(
        &self,
        compiler_state: &CompilerState,
        log_event: &impl PerfLogEvent,
    ) -> Result<(), Error> {
        debug!("Initial build started...");
        // TODO: (from https://fburl.com/diff/m8jg14sy) - pass source code update status to
        // `compiler.build_schemas` and `compiler.build_source_programs` to cancel build earlier,
        // if update detected
        self.build_schemas(compiler_state, log_event)?;
        self.build_source_programs(compiler_state, log_event)?;

        Ok(())
    }

    fn build_schemas(
        &self,
        compiler_state: &CompilerState,
        log_event: &impl PerfLogEvent,
    ) -> Result<(), Error> {
        debug!("Building schemas");
        let timer = log_event.start("build_schemas");

        // Stop building programs if we detect source code update
        if self.source_code_update_status.is_started() {
            return Ok(());
        }

        let (next_schemas, build_errors) = self.compiler.build_schemas(&compiler_state, log_event);
        self.schemas
            .write()
            .expect("LSPState::watch_and_update_schemas: expect to acquire write lock on schemas")
            .clone_from(&next_schemas);

        let result = if !build_errors.is_empty() {
            Err(Error::DiagnosticsError {
                errors: build_errors,
            })
        } else {
            Ok(())
        };

        log_event.stop(timer);

        result
    }

    fn build_source_programs(
        &self,
        compiler_state: &CompilerState,
        log_event: &impl PerfLogEvent,
    ) -> Result<(), Error> {
        debug!("Building source programs");
        // Stop building programs if we detect source code update
        if self.source_code_update_status.is_started() {
            return Ok(());
        }
        let timer = log_event.start("build_source_programs_time");

        // This will build programs, but won't apply any transformations to them
        // that should be enough for LSP to start showing fragments information
        let (programs, build_errors) = self.compiler.build_raw_programs(
            compiler_state,
            &self
                .schemas
                .read()
                .expect("LSPState::build_in_watch_mode: expect to acquire read lock on schemas"),
            log_event,
        )?;

        let mut source_programs_write_lock = self.source_programs.write().expect(
            "LSPState::build_in_watch_mode: expect to acquire write lock on source_programs",
        );

        for (program_name, program) in programs {
            // NOTE: Currently, we rely on the fact that `build_raw_programs`
            // will always return a full program, so we can safely replace it in the current
            // list of source_programs
            source_programs_write_lock.insert(program_name, program);
        }


        let result = if !build_errors.is_empty() {
            Err(Error::BuildProjectsErrors {
                errors: build_errors,
            })
        } else {
            Ok(())
        };

        log_event.stop(timer);

        result
    }

    fn watchman_subscription_handler(
        &self,
        mut file_source_subscription: FileSourceSubscription,
        pending_file_source_changes: Arc<RwLock<Vec<FileSourceResult>>>,
    ) -> JoinHandle<()> {
        let source_code_update_status = self.source_code_update_status.clone();
        let notify_sender = self.notify_sender.clone();
        task::spawn(async move {
            loop {
                match file_source_subscription.next_change().await {
                    Err(_) => {
                        // do nothing? compiler should panic, and restart the lsp
                    }
                    Ok(FileSourceSubscriptionNextChange::None) => {}
                    Ok(FileSourceSubscriptionNextChange::SourceControlUpdateEnter) => {
                        source_code_update_status.mark_as_started();
                        notify_sender.notify_one();
                    }
                    Ok(FileSourceSubscriptionNextChange::SourceControlUpdateLeave) => {
                        source_code_update_status.mark_as_completed();
                        notify_sender.notify_one();
                    }
                    Ok(FileSourceSubscriptionNextChange::Result(file_source_changes)) => {
                        pending_file_source_changes
                            .write()
                            .expect("LSPState::watch_and_update_schemas: expect to acquire write lock on pending_file_source_changes")
                            .push(file_source_changes);

                        notify_sender.notify_one();
                    }
                }
            }
        })
    }

    fn report_error(&self, error: Error) {
        self.diagnostic_reporter.report_error(&error);
        self.errors.write().unwrap().push(error.to_string());
    }

    fn log_errors(&self, log_event_name: &str) {
        if let Ok(read_lock) = self.errors.try_read() {
            if !read_lock.is_empty() {
                let error_message = read_lock
                    .iter()
                    .map(|err| format!("{:?}", err))
                    .collect::<Vec<String>>()
                    .join("\n");
                let error_event = self.perf_logger.create_event(log_event_name);
                error_event.string("error", error_message);
                self.perf_logger.complete_event(error_event);
                self.perf_logger.flush();
            }
        }
    }

    fn clear_errors(&self) {
        if let Ok(mut write_lock) = self.errors.try_write() {
            write_lock.clear();
        }
    }

    /// This method, will log errors (if there were errors)
    /// and report the diagnostics to IDE
    fn publish_errors(&self, log_event_name: &str) {
        self.log_errors(log_event_name);
        self.clear_errors();
        self.diagnostic_reporter.commit_diagnostics();
    }
}
