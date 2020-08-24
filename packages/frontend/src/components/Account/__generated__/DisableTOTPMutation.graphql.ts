/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type DisableTOTPInput = {
    password: string;
};
export type DisableTOTPMutationVariables = {
    input: DisableTOTPInput;
};
export type DisableTOTPMutationResponse = {
    readonly disableTOTP: {
        readonly id: string;
        readonly hasTOTP: boolean;
    };
};
export type DisableTOTPMutation = {
    readonly response: DisableTOTPMutationResponse;
    readonly variables: DisableTOTPMutationVariables;
};



/*
mutation DisableTOTPMutation(
  $input: DisableTOTPInput!
) {
  disableTOTP(input: $input) {
    id
    hasTOTP
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "disableTOTP",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "hasTOTP",
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
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DisableTOTPMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "545bf730e06fa95f375e430103da9145",
    "id": null,
    "metadata": {},
    "name": "DisableTOTPMutation",
    "operationKind": "mutation",
    "text": "mutation DisableTOTPMutation(\n  $input: DisableTOTPInput!\n) {\n  disableTOTP(input: $input) {\n    id\n    hasTOTP\n  }\n}\n"
  }
};
})();
(node as any).hash = '3822d5a21af1a41051e63286d5025200';
export default node;
