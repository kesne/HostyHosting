/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type GitHubCallbackMutationVariables = {
    code: string;
};
export type GitHubCallbackMutationResponse = {
    readonly gitHubSignIn: {
        readonly ok: boolean;
        readonly requiresTOTP: boolean;
    };
};
export type GitHubCallbackMutation = {
    readonly response: GitHubCallbackMutationResponse;
    readonly variables: GitHubCallbackMutationVariables;
};



/*
mutation GitHubCallbackMutation(
  $code: String!
) {
  gitHubSignIn(code: $code) {
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
    "name": "code",
    "type": "String!"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "code",
        "variableName": "code"
      }
    ],
    "concreteType": "SignInResult",
    "kind": "LinkedField",
    "name": "gitHubSignIn",
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
    "name": "GitHubCallbackMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GitHubCallbackMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "GitHubCallbackMutation",
    "operationKind": "mutation",
    "text": "mutation GitHubCallbackMutation(\n  $code: String!\n) {\n  gitHubSignIn(code: $code) {\n    ok\n    requiresTOTP\n  }\n}\n"
  }
};
})();
(node as any).hash = '387707695ef0a627349a522b8cb6732c';
export default node;
