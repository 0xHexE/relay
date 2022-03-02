(self.webpackChunk=self.webpackChunk||[]).push([[66619],{3905:(e,t,n)=>{"use strict";n.r(t),n.d(t,{MDXContext:()=>s,MDXProvider:()=>p,mdx:()=>y,useMDXComponents:()=>u,withMDXComponents:()=>c});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(){return i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},i.apply(this,arguments)}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function d(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),c=function(e){return function(t){var n=u(t.components);return a.createElement(e,i({},t,{components:n}))}},u=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=u(e.components);return a.createElement(s.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},f=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,s=d(e,["components","mdxType","originalType","parentName"]),c=u(n),p=r,f=c["".concat(l,".").concat(p)]||c[p]||m[p]||i;return n?a.createElement(f,o(o({ref:t},s),{},{components:n})):a.createElement(f,o({ref:t},s))}));function y(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,l=new Array(i);l[0]=f;var o={};for(var d in t)hasOwnProperty.call(t,d)&&(o[d]=t[d]);o.originalType=e,o.mdxType="string"==typeof e?e:r,l[1]=o;for(var s=2;s<i;s++)l[s]=n[s];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}f.displayName="MDXCreateElement"},36742:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>m});var a=n(79973),r=n(67294),i=n(73727),l=n(52263),o=n(13919),d=n(10412),s=(0,r.createContext)({collectLink:function(){}}),c=n(44996),u=n(18780),p=["isNavLink","to","href","activeClassName","isActive","data-noBrokenLinkCheck","autoAddBaseUrl"];const m=function(e){var t,n,m=e.isNavLink,f=e.to,y=e.href,h=e.activeClassName,g=e.isActive,v=e["data-noBrokenLinkCheck"],x=e.autoAddBaseUrl,w=void 0===x||x,b=(0,a.Z)(e,p),O=(0,l.default)().siteConfig,C=O.trailingSlash,E=O.baseUrl,N=(0,c.useBaseUrlUtils)().withBaseUrl,k=(0,r.useContext)(s),D=f||y,P=(0,o.Z)(D),j=null==D?void 0:D.replace("pathname://",""),T=void 0!==j?(n=j,w&&function(e){return e.startsWith("/")}(n)?N(n):n):void 0;T&&P&&(T=(0,u.applyTrailingSlash)(T,{trailingSlash:C,baseUrl:E}));var _=(0,r.useRef)(!1),R=m?i.OL:i.rU,U=d.default.canUseIntersectionObserver,I=(0,r.useRef)();(0,r.useEffect)((function(){return!U&&P&&null!=T&&window.docusaurus.prefetch(T),function(){U&&I.current&&I.current.disconnect()}}),[I,T,U,P]);var S=null!==(t=null==T?void 0:T.startsWith("#"))&&void 0!==t&&t,A=!T||!P||S;return T&&P&&!S&&!v&&k.collectLink(T),A?r.createElement("a",Object.assign({href:T},D&&!P&&{target:"_blank",rel:"noopener noreferrer"},b)):r.createElement(R,Object.assign({},b,{onMouseEnter:function(){_.current||null==T||(window.docusaurus.preload(T),_.current=!0)},innerRef:function(e){var t,n;U&&e&&P&&(t=e,n=function(){null!=T&&window.docusaurus.prefetch(T)},I.current=new window.IntersectionObserver((function(e){e.forEach((function(e){t===e.target&&(e.isIntersecting||e.intersectionRatio>0)&&(I.current.unobserve(t),I.current.disconnect(),n())}))})),I.current.observe(t))},to:T||""},m&&{isActive:g,activeClassName:h}))}},13919:(e,t,n)=>{"use strict";function a(e){return!0===/^(\w*:|\/\/)/.test(e)}function r(e){return void 0!==e&&!a(e)}n.d(t,{b:()=>a,Z:()=>r})},44996:(e,t,n)=>{"use strict";n.r(t),n.d(t,{useBaseUrlUtils:()=>i,default:()=>l});var a=n(52263),r=n(13919);function i(){var e=(0,a.default)().siteConfig,t=(e=void 0===e?{}:e).baseUrl,n=void 0===t?"/":t,i=e.url;return{withBaseUrl:function(e,t){return function(e,t,n,a){var i=void 0===a?{}:a,l=i.forcePrependBaseUrl,o=void 0!==l&&l,d=i.absolute,s=void 0!==d&&d;if(!n)return n;if(n.startsWith("#"))return n;if((0,r.b)(n))return n;if(o)return t+n;var c=n.startsWith(t)?n:t+n.replace(/^\//,"");return s?e+c:c}(i,n,e,t)}}}function l(e,t){return void 0===t&&(t={}),(0,i().withBaseUrl)(e,t)}},8802:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var n=t.trailingSlash,a=t.baseUrl;if(e.startsWith("#"))return e;if(void 0===n)return e;var r,i=e.split(/[#?]/)[0],l="/"===i||i===a?i:(r=i,n?function(e){return e.endsWith("/")?e:e+"/"}(r):function(e){return e.endsWith("/")?e.slice(0,-1):e}(r));return e.replace(i,l)}},18780:function(e,t,n){"use strict";var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.uniq=t.applyTrailingSlash=void 0;var r=n(8802);Object.defineProperty(t,"applyTrailingSlash",{enumerable:!0,get:function(){return a(r).default}});var i=n(29964);Object.defineProperty(t,"uniq",{enumerable:!0,get:function(){return a(i).default}})},29964:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return Array.from(new Set(e))}},68629:(e,t,n)=>{"use strict";n.d(t,{Z:()=>m});var a=n(36742),r=n(44256),i=n(67294);function l(){var e=window.encodeURI(JSON.stringify({title:"Feedback about "+window.location.pathname,description:"**!!! Required !!!**\n\nPlease modify the task description to let us know how the docs can be improved.\n\n**Please do not ask support questions via this form! Instead, ask in fburl.com/relay_support**",tag_ids:{add:[0xac96423e5b680,0x64079768ac750]}}));window.open("https://www.internalfb.com/tasks/?n="+e)}function o(e){var t=e.children;return i.createElement("div",{className:"docsRating",id:"docsRating"},i.createElement("hr",null),t)}var d=function(){var e=i.useState(!1),t=e[0],n=e[1],a=function(e){n(!0),function(e){window.ga&&window.ga("send",{hitType:"event",eventCategory:"button",eventAction:"feedback",eventValue:e})}(e)};return t?"Thank you for letting us know!":i.createElement(i.Fragment,null,"Is this page useful?",i.createElement("svg",{className:"i_thumbsup",alt:"Like",id:"docsRating-like",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 81.13 89.76",onClick:function(){return a(1)}},i.createElement("path",{d:"M22.9 6a18.57 18.57 0 002.67 8.4 25.72 25.72 0 008.65 7.66c3.86 2 8.67 7.13 13.51 11 3.86 3.11 8.57 7.11 11.54 8.45s13.59.26 14.64 1.17c1.88 1.63 1.55 9-.11 15.25-1.61 5.86-5.96 10.55-6.48 16.86-.4 4.83-2.7 4.88-10.93 4.88h-1.35c-3.82 0-8.24 2.93-12.92 3.62a68 68 0 01-9.73.5c-3.57 0-7.86-.08-13.25-.08-3.56 0-4.71-1.83-4.71-4.48h8.42a3.51 3.51 0 000-7H12.28a2.89 2.89 0 01-2.88-2.88 1.91 1.91 0 01.77-1.78h16.46a3.51 3.51 0 000-7H12.29c-3.21 0-4.84-1.83-4.84-4a6.41 6.41 0 011.17-3.78h19.06a3.5 3.5 0 100-7H9.75A3.51 3.51 0 016 42.27a3.45 3.45 0 013.75-3.48h13.11c5.61 0 7.71-3 5.71-5.52-4.43-4.74-10.84-12.62-11-18.71-.15-6.51 2.6-7.83 5.36-8.56m0-6a6.18 6.18 0 00-1.53.2c-6.69 1.77-10 6.65-9.82 14.5.08 5.09 2.99 11.18 8.52 18.09H9.74a9.52 9.52 0 00-6.23 16.9 12.52 12.52 0 00-2.07 6.84 9.64 9.64 0 003.65 7.7 7.85 7.85 0 00-1.7 5.13 8.9 8.9 0 005.3 8.13 6 6 0 00-.26 1.76c0 6.37 4.2 10.48 10.71 10.48h13.25a73.75 73.75 0 0010.6-.56 35.89 35.89 0 007.58-2.18 17.83 17.83 0 014.48-1.34h1.35c4.69 0 7.79 0 10.5-1 3.85-1.44 6-4.59 6.41-9.38.2-2.46 1.42-4.85 2.84-7.62a41.3 41.3 0 003.42-8.13 48 48 0 001.59-10.79c.1-5.13-1-8.48-3.35-10.55-2.16-1.87-4.64-1.87-9.6-1.88a46.86 46.86 0 01-6.64-.29c-1.92-.94-5.72-4-8.51-6.3l-1.58-1.28c-1.6-1.3-3.27-2.79-4.87-4.23-3.33-3-6.47-5.79-9.61-7.45a20.2 20.2 0 01-6.43-5.53 12.44 12.44 0 01-1.72-5.36 6 6 0 00-6-5.86z"})),i.createElement("svg",{className:"i_thumbsdown",alt:"Dislike",id:"docsRating-dislike",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 81.13 89.76",onClick:function(){return a(0)}},i.createElement("path",{d:"M22.9 6a18.57 18.57 0 002.67 8.4 25.72 25.72 0 008.65 7.66c3.86 2 8.67 7.13 13.51 11 3.86 3.11 8.57 7.11 11.54 8.45s13.59.26 14.64 1.17c1.88 1.63 1.55 9-.11 15.25-1.61 5.86-5.96 10.55-6.48 16.86-.4 4.83-2.7 4.88-10.93 4.88h-1.35c-3.82 0-8.24 2.93-12.92 3.62a68 68 0 01-9.73.5c-3.57 0-7.86-.08-13.25-.08-3.56 0-4.71-1.83-4.71-4.48h8.42a3.51 3.51 0 000-7H12.28a2.89 2.89 0 01-2.88-2.88 1.91 1.91 0 01.77-1.78h16.46a3.51 3.51 0 000-7H12.29c-3.21 0-4.84-1.83-4.84-4a6.41 6.41 0 011.17-3.78h19.06a3.5 3.5 0 100-7H9.75A3.51 3.51 0 016 42.27a3.45 3.45 0 013.75-3.48h13.11c5.61 0 7.71-3 5.71-5.52-4.43-4.74-10.84-12.62-11-18.71-.15-6.51 2.6-7.83 5.36-8.56m0-6a6.18 6.18 0 00-1.53.2c-6.69 1.77-10 6.65-9.82 14.5.08 5.09 2.99 11.18 8.52 18.09H9.74a9.52 9.52 0 00-6.23 16.9 12.52 12.52 0 00-2.07 6.84 9.64 9.64 0 003.65 7.7 7.85 7.85 0 00-1.7 5.13 8.9 8.9 0 005.3 8.13 6 6 0 00-.26 1.76c0 6.37 4.2 10.48 10.71 10.48h13.25a73.75 73.75 0 0010.6-.56 35.89 35.89 0 007.58-2.18 17.83 17.83 0 014.48-1.34h1.35c4.69 0 7.79 0 10.5-1 3.85-1.44 6-4.59 6.41-9.38.2-2.46 1.42-4.85 2.84-7.62a41.3 41.3 0 003.42-8.13 48 48 0 001.59-10.79c.1-5.13-1-8.48-3.35-10.55-2.16-1.87-4.64-1.87-9.6-1.88a46.86 46.86 0 01-6.64-.29c-1.92-.94-5.72-4-8.51-6.3l-1.58-1.28c-1.6-1.3-3.27-2.79-4.87-4.23-3.33-3-6.47-5.79-9.61-7.45a20.2 20.2 0 01-6.43-5.53 12.44 12.44 0 01-1.72-5.36 6 6 0 00-6-5.86z"})))},s=function(){return i.createElement("p",null,"Let us know how these docs can be improved by",i.createElement("a",{className:"button",role:"button",tabIndex:0,onClick:l},"Filing a task"))},c=function(){return i.createElement("p",null,"Help us make the site even better by"," ",i.createElement(a.default,{to:"https://www.surveymonkey.com/r/FYC9TCJ"},"answering a few quick questions"),".")},u=function(){return i.createElement(o,null,i.createElement(s,null),i.createElement(d,null),i.createElement(c,null))},p=function(){return i.createElement(o,null,i.createElement(d,null),i.createElement(c,null))};const m=function(){return(0,r.fbContent)({internal:i.createElement(u,null),external:i.createElement(p,null)})}},88474:(e,t,n)=>{"use strict";n.r(t),n.d(t,{frontMatter:()=>c,contentTitle:()=>u,metadata:()=>p,toc:()=>m,default:()=>h});var a,r=n(74034),i=n(79973),l=(n(67294),n(3905)),o=n(68629),d=n(44256),s=["components"],c={id:"client-only-data",title:"Client-Only Data",slug:"/guided-tour/updating-data/client-only-data/",description:"Relay guide to client-only data",keywords:["client-only"]},u=void 0,p={unversionedId:"guided-tour/updating-data/client-only-data",id:"version-v13.0.0/guided-tour/updating-data/client-only-data",isDocsHomePage:!1,title:"Client-Only Data",description:"Relay guide to client-only data",source:"@site/versioned_docs/version-v13.0.0/guided-tour/updating-data/client-only-data.md",sourceDirName:"guided-tour/updating-data",slug:"/guided-tour/updating-data/client-only-data/",permalink:"/docs/guided-tour/updating-data/client-only-data/",editUrl:"https://github.com/facebook/relay/tree/main/website/versioned_docs/version-v13.0.0/guided-tour/updating-data/client-only-data.md",tags:[],version:"v13.0.0",lastUpdatedBy:"Jordan Eldredge",lastUpdatedAt:1646243528,formattedLastUpdatedAt:"3/2/2022",frontMatter:{id:"client-only-data",title:"Client-Only Data",slug:"/guided-tour/updating-data/client-only-data/",description:"Relay guide to client-only data",keywords:["client-only"]},sidebar:"version-v13.0.0/docs",previous:{title:"Local Data Updates",permalink:"/docs/guided-tour/updating-data/local-data-updates/"},next:{title:"Retaining Queries",permalink:"/docs/guided-tour/accessing-data-without-react/retaining-queries/"}},m=[{value:"Client-Only Data (Client Schema Extensions)",id:"client-only-data-client-schema-extensions",children:[{value:"Extending Existing Types",id:"extending-existing-types",children:[],level:3},{value:"Adding New Types",id:"adding-new-types",children:[],level:3},{value:"Reading Client-Only Data",id:"reading-client-only-data",children:[],level:3},{value:"Updating Client-Only Data",id:"updating-client-only-data",children:[],level:3}],level:2}],f=(a="FbClientOnlyDataDir",function(e){return console.warn("Component "+a+" was not imported, exported, or provided by MDXProvider as global scope"),(0,l.mdx)("div",e)}),y={toc:m};function h(e){var t=e.components,n=(0,i.Z)(e,s);return(0,l.mdx)("wrapper",(0,r.Z)({},y,n,{components:t,mdxType:"MDXLayout"}),(0,l.mdx)("h2",{id:"client-only-data-client-schema-extensions"},"Client-Only Data (Client Schema Extensions)"),(0,l.mdx)("p",null,"Relay provides the ability to extend the GraphQL schema ",(0,l.mdx)("em",{parentName:"p"},"on the client")," (i.e. in the browser), via client schema extensions, in order to model data that only needs to be created, read and updated on the client. This can be useful to add small pieces of information to data that is fetched from the server, or to entirely model client-specific state to be stored and managed by Relay."),(0,l.mdx)("p",null,"Client schema extensions allows you to modify existing types on the schema (e.g. by adding new fields to a type), or to create entirely new types that only exist in the client."),(0,l.mdx)("h3",{id:"extending-existing-types"},"Extending Existing Types"),(0,l.mdx)(d.FbInternalOnly,{mdxType:"FbInternalOnly"},(0,l.mdx)("p",null,"In order to extend an existing type, add a ",(0,l.mdx)("inlineCode",{parentName:"p"},".graphql")," file to the appropriate schema extension directory (depending on the repo):")),(0,l.mdx)(d.OssOnly,{mdxType:"OssOnly"},(0,l.mdx)("p",null,"In order to extend an existing type, add a ",(0,l.mdx)("inlineCode",{parentName:"p"},".graphql")," file to your appropriate source (",(0,l.mdx)("inlineCode",{parentName:"p"},"--src"),") directory:")),(0,l.mdx)("pre",null,(0,l.mdx)("code",{parentName:"pre",className:"language-graphql"},"extend type Comment {\n  is_new_comment: Boolean\n}\n")),(0,l.mdx)(d.FbInternalOnly,{mdxType:"FbInternalOnly"},(0,l.mdx)(f,{mdxType:"FbClientOnlyDataDir"})),(0,l.mdx)(d.OssOnly,{mdxType:"OssOnly"},(0,l.mdx)("ul",null,(0,l.mdx)("li",{parentName:"ul"},"In this example, we're using the ",(0,l.mdx)("inlineCode",{parentName:"li"},"extend")," keyword to extend an existing type, and we're adding a new field, ",(0,l.mdx)("inlineCode",{parentName:"li"},"is_new_comment")," to the existing ",(0,l.mdx)("inlineCode",{parentName:"li"},"Comment")," type, which we will be able to ",(0,l.mdx)("a",{parentName:"li",href:"#reading-client-only-data"},"read")," in our components, and ",(0,l.mdx)("a",{parentName:"li",href:"#updating-client-only-data"},"update")," when necessary using normal Relay APIs; you might imagine that we might use this field to render a different visual treatment for a comment if it's new, and we might set it when creating a new comment."))),(0,l.mdx)("h3",{id:"adding-new-types"},"Adding New Types"),(0,l.mdx)("p",null,"You can define types using the same regular GraphQL syntax, by defining it inside a ",(0,l.mdx)("inlineCode",{parentName:"p"},".graphql")," file in  ",(0,l.mdx)("inlineCode",{parentName:"p"},"html/js/relay/schema/"),":"),(0,l.mdx)("pre",null,(0,l.mdx)("code",{parentName:"pre",className:"language-graphql"},"# You can define more than one type in a single file\nenum FetchStatus {\n  FETCHED\n  PENDING\n  ERRORED\n}\n\n\ntype FetchState {\n  # You can reuse client types to define other types\n  status: FetchStatus\n\n  # You can also reference regular server types\n  started_by: User!\n}\n\nextend type Item {\n  # You can extend server types with client-only types\n  fetch_state: FetchState\n}\n")),(0,l.mdx)("ul",null,(0,l.mdx)("li",{parentName:"ul"},"In this contrived example, we're defining 2 new client-only types, and ",(0,l.mdx)("inlineCode",{parentName:"li"},"enum")," and a regular ",(0,l.mdx)("inlineCode",{parentName:"li"},"type"),". Note that they can reference themselves as normal, and reference regular server defined types. Also note that we can extend server types and add fields that are of our client-only types."),(0,l.mdx)("li",{parentName:"ul"},"As mentioned previously, we will be able to ",(0,l.mdx)("a",{parentName:"li",href:"#reading-client-only-data"},"read")," and ",(0,l.mdx)("a",{parentName:"li",href:"#updating-client-only-data"},"update")," this data normally via Relay APIs.")),(0,l.mdx)("h3",{id:"reading-client-only-data"},"Reading Client-Only Data"),(0,l.mdx)("p",null,"We can read client-only data be selecting it inside ",(0,l.mdx)("a",{parentName:"p",href:"../../rendering/fragments/"},"fragments")," or ",(0,l.mdx)("a",{parentName:"p",href:"../../rendering/queries/"},"queries")," as normal:"),(0,l.mdx)("pre",null,(0,l.mdx)("code",{parentName:"pre",className:"language-js"},"const data = *useFragment*(\n  graphql`\n    fragment CommentComponent_comment on Comment {\n\n      # We can select client-only fields as we would any other field\n      is_new_comment\n\n      body {\n        text\n      }\n    }\n  `,\n  props.user,\n);\n")),(0,l.mdx)("h3",{id:"updating-client-only-data"},"Updating Client-Only Data"),(0,l.mdx)("p",null,"In order to update client-only data, you can do so regularly inside ",(0,l.mdx)("a",{parentName:"p",href:"../graphql-mutations/"},"mutation")," or ",(0,l.mdx)("a",{parentName:"p",href:"../graphql-subscriptions/"},"subscription")," updaters, or by using our primitives for doing ",(0,l.mdx)("a",{parentName:"p",href:"../local-data-updates/"},"local updates")," to the store."),(0,l.mdx)(o.Z,{mdxType:"DocsRating"}))}h.isMDXComponent=!0}}]);