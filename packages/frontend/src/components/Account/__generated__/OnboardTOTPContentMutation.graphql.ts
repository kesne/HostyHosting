/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type OnboardTOTPContentMutationVariables = {
    secret: string;
    token: string;
};
export type OnboardTOTPContentMutationResponse = {
    readonly enableTotp: {
        readonly ok: boolean;
    };
};
export type OnboardTOTPContentMutation = {
    readonly response: OnboardTOTPContentMutationResponse;
    readonly variables: OnboardTOTPContentMutationVariables;
};



/*
mutation OnboardTOTPContentMutation(
  $secret: String!
  $token: String!
) {
  enableTotp(secret: $secret, token: $token) {
    ok
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "secret",
    "type": "String!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "token",
    "type": "String!"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "secret",
        "variableName": "secret"
      },
      {
        "kind": "Variable",
        "name": "token",
        "variableName": "token"
      }
    ],
    "concreteType": "Result",
    "kind": "LinkedField",
    "name": "enableTotp",
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
    "name": "OnboardTOTPContentMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "OnboardTOTPContentMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "OnboardTOTPContentMutation",
    "operationKind": "mutation",
    "text": "mutation OnboardTOTPContentMutation(\n  $secret: String!\n  $token: String!\n) {\n  enableTotp(secret: $secret, token: $token) {\n    ok\n  }\n}\n"
  }
};
})();
(node as any).hash = 'bd8141849711f92b869eeded9be8cb2f';
export default node;
