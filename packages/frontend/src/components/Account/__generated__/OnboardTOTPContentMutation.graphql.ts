/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type EnableTOTPInput = {
    secret: string;
    token: string;
};
export type OnboardTOTPContentMutationVariables = {
    input: EnableTOTPInput;
};
export type OnboardTOTPContentMutationResponse = {
    readonly enableTOTP: {
        readonly id: string;
        readonly hasTOTP: boolean;
    };
};
export type OnboardTOTPContentMutation = {
    readonly response: OnboardTOTPContentMutationResponse;
    readonly variables: OnboardTOTPContentMutationVariables;
};



/*
mutation OnboardTOTPContentMutation(
  $input: EnableTOTPInput!
) {
  enableTOTP(input: $input) {
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
    "name": "input",
    "type": "EnableTOTPInput!"
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
    "name": "enableTOTP",
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
    "text": "mutation OnboardTOTPContentMutation(\n  $input: EnableTOTPInput!\n) {\n  enableTOTP(input: $input) {\n    id\n    hasTOTP\n  }\n}\n"
  }
};
})();
(node as any).hash = '518056602c8e7fa7731f670d074c472b';
export default node;
