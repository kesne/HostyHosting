/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type ResetPasswordMutationVariables = {
    uuid: string;
    password: string;
};
export type ResetPasswordMutationResponse = {
    readonly resetPassword: {
        readonly ok: boolean;
    };
};
export type ResetPasswordMutation = {
    readonly response: ResetPasswordMutationResponse;
    readonly variables: ResetPasswordMutationVariables;
};



/*
mutation ResetPasswordMutation(
  $uuid: String!
  $password: String!
) {
  resetPassword(uuid: $uuid, password: $password) {
    ok
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "password"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "uuid"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "password",
        "variableName": "password"
      },
      {
        "kind": "Variable",
        "name": "uuid",
        "variableName": "uuid"
      }
    ],
    "concreteType": "Result",
    "kind": "LinkedField",
    "name": "resetPassword",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "ok",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ResetPasswordMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "ResetPasswordMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "eea81218b1bfe76a5927f576c7379938",
    "id": null,
    "metadata": {},
    "name": "ResetPasswordMutation",
    "operationKind": "mutation",
    "text": "mutation ResetPasswordMutation(\n  $uuid: String!\n  $password: String!\n) {\n  resetPassword(uuid: $uuid, password: $password) {\n    ok\n  }\n}\n"
  }
};
})();
(node as any).hash = 'd88e6c7d8a56036c8434a6bcbbd24ca6';
export default node;
