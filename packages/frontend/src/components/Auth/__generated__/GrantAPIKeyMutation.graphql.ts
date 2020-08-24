/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type GrantAPIKeyMutationVariables = {
    uuid: string;
};
export type GrantAPIKeyMutationResponse = {
    readonly grantAPIKey: {
        readonly ok: boolean;
    };
};
export type GrantAPIKeyMutation = {
    readonly response: GrantAPIKeyMutationResponse;
    readonly variables: GrantAPIKeyMutationVariables;
};



/*
mutation GrantAPIKeyMutation(
  $uuid: String!
) {
  grantAPIKey(uuid: $uuid) {
    ok
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "uuid"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "uuid",
        "variableName": "uuid"
      }
    ],
    "concreteType": "Result",
    "kind": "LinkedField",
    "name": "grantAPIKey",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "GrantAPIKeyMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GrantAPIKeyMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f0b8d6c0a15131bba0097cf6ea57a154",
    "id": null,
    "metadata": {},
    "name": "GrantAPIKeyMutation",
    "operationKind": "mutation",
    "text": "mutation GrantAPIKeyMutation(\n  $uuid: String!\n) {\n  grantAPIKey(uuid: $uuid) {\n    ok\n  }\n}\n"
  }
};
})();
(node as any).hash = 'f90d173c080f99b6bfb4d022a76d6338';
export default node;
