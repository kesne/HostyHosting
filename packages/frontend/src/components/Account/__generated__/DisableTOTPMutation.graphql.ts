/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type DisableTOTPMutationVariables = {
    password: string;
};
export type DisableTOTPMutationResponse = {
    readonly disableTotp: {
        readonly ok: boolean;
    };
};
export type DisableTOTPMutation = {
    readonly response: DisableTOTPMutationResponse;
    readonly variables: DisableTOTPMutationVariables;
};



/*
mutation DisableTOTPMutation(
  $password: String!
) {
  disableTotp(password: $password) {
    ok
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
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
        "name": "password",
        "variableName": "password"
      }
    ],
    "concreteType": "Result",
    "kind": "LinkedField",
    "name": "disableTotp",
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
    "name": "DisableTOTPMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DisableTOTPMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "DisableTOTPMutation",
    "operationKind": "mutation",
    "text": "mutation DisableTOTPMutation(\n  $password: String!\n) {\n  disableTotp(password: $password) {\n    ok\n  }\n}\n"
  }
};
})();
(node as any).hash = '2f04deadc9251a9336f3ab7f16beac6b';
export default node;
