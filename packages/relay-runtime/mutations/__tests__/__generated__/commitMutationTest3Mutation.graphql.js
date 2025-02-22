/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @generated SignedSource<<e300a81e40c039bc398d841fc6800d1d>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type UnfriendInput = {|
  friendId?: ?string,
|};
export type commitMutationTest3Mutation$variables = {|
  input?: ?UnfriendInput,
|};
export type commitMutationTest3Mutation$data = {|
  +unfriend: ?{|
    +actor: ?{|
      +id: string,
    |},
    +formerFriend: ?{|
      +id: string,
    |},
  |},
|};
export type commitMutationTest3Mutation = {|
  response: commitMutationTest3Mutation$data,
  variables: commitMutationTest3Mutation$variables,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = [
  (v2/*: any*/)
],
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "formerFriend",
  "plural": false,
  "selections": (v3/*: any*/),
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "commitMutationTest3Mutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UnfriendResponsePayload",
        "kind": "LinkedField",
        "name": "unfriend",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "actor",
            "plural": false,
            "selections": (v3/*: any*/),
            "storageKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "commitMutationTest3Mutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UnfriendResponsePayload",
        "kind": "LinkedField",
        "name": "unfriend",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "actor",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6d6ebd50822a8405867890ffe3760ae1",
    "id": null,
    "metadata": {},
    "name": "commitMutationTest3Mutation",
    "operationKind": "mutation",
    "text": "mutation commitMutationTest3Mutation(\n  $input: UnfriendInput\n) {\n  unfriend(input: $input) {\n    actor {\n      __typename\n      id\n    }\n    formerFriend {\n      id\n    }\n  }\n}\n"
  }
};
})();

if (__DEV__) {
  (node/*: any*/).hash = "dab27d75e734a4b036d32acce8a9fbf0";
}

module.exports = ((node/*: any*/)/*: Mutation<
  commitMutationTest3Mutation$variables,
  commitMutationTest3Mutation$data,
>*/);
