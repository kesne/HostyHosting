/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type ForgotPasswordMutationVariables = {
    email: string;
};
export type ForgotPasswordMutationResponse = {
    readonly forgotPassword: {
        readonly ok: boolean;
    };
};
export type ForgotPasswordMutation = {
    readonly response: ForgotPasswordMutationResponse;
    readonly variables: ForgotPasswordMutationVariables;
};



/*
mutation ForgotPasswordMutation(
  $email: String!
) {
  forgotPassword(email: $email) {
    ok
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "email"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "email",
        "variableName": "email"
      }
    ],
    "concreteType": "Result",
    "kind": "LinkedField",
    "name": "forgotPassword",
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
    "name": "ForgotPasswordMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ForgotPasswordMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c5e5bc3648c0b9611f4cf19418c123ee",
    "id": null,
    "metadata": {},
    "name": "ForgotPasswordMutation",
    "operationKind": "mutation",
    "text": "mutation ForgotPasswordMutation(\n  $email: String!\n) {\n  forgotPassword(email: $email) {\n    ok\n  }\n}\n"
  }
};
})();
(node as any).hash = '159f17a1f97a8da3c3f65113aca9ba4c';
export default node;
