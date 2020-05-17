/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type EmailPasswordMutationVariables = {
    email: string;
    password: string;
};
export type EmailPasswordMutationResponse = {
    readonly signIn: {
        readonly ok: boolean;
        readonly requiresTOTP: boolean;
    };
};
export type EmailPasswordMutation = {
    readonly response: EmailPasswordMutationResponse;
    readonly variables: EmailPasswordMutationVariables;
};



/*
mutation EmailPasswordMutation(
  $email: String!
  $password: String!
) {
  signIn(email: $email, password: $password) {
    ok
    requiresTOTP
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "email",
    "type": "String!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "password",
    "type": "String!"
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
      },
      {
        "kind": "Variable",
        "name": "password",
        "variableName": "password"
      }
    ],
    "concreteType": "SignInResult",
    "kind": "LinkedField",
    "name": "signIn",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "ok",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "requiresTOTP",
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
    "name": "EmailPasswordMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EmailPasswordMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "EmailPasswordMutation",
    "operationKind": "mutation",
    "text": "mutation EmailPasswordMutation(\n  $email: String!\n  $password: String!\n) {\n  signIn(email: $email, password: $password) {\n    ok\n    requiresTOTP\n  }\n}\n"
  }
};
})();
(node as any).hash = 'd1dc64b34339cd00a83cf83e611fce66';
export default node;
