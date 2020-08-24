/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type VerifyTOTPMutationVariables = {
    token: string;
};
export type VerifyTOTPMutationResponse = {
    readonly exchangeTOTP: {
        readonly ok: boolean;
    };
};
export type VerifyTOTPMutation = {
    readonly response: VerifyTOTPMutationResponse;
    readonly variables: VerifyTOTPMutationVariables;
};



/*
mutation VerifyTOTPMutation(
  $token: String!
) {
  exchangeTOTP(token: $token) {
    ok
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "token"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "token",
        "variableName": "token"
      }
    ],
    "concreteType": "Result",
    "kind": "LinkedField",
    "name": "exchangeTOTP",
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
    "name": "VerifyTOTPMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "VerifyTOTPMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "8b78cf814d4348a241b00a96c7d3e403",
    "id": null,
    "metadata": {},
    "name": "VerifyTOTPMutation",
    "operationKind": "mutation",
    "text": "mutation VerifyTOTPMutation(\n  $token: String!\n) {\n  exchangeTOTP(token: $token) {\n    ok\n  }\n}\n"
  }
};
})();
(node as any).hash = '24bb1066ea7404e6ac631fd611e0bfa3';
export default node;
