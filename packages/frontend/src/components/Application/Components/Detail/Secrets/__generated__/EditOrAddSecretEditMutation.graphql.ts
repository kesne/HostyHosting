/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type EditSecretInput = {
    secretID: string;
    key: string;
    value: string;
};
export type EditOrAddSecretEditMutationVariables = {
    input: EditSecretInput;
};
export type EditOrAddSecretEditMutationResponse = {
    readonly editSecret: {
        readonly id: string;
        readonly key: string;
        readonly value: string;
    };
};
export type EditOrAddSecretEditMutation = {
    readonly response: EditOrAddSecretEditMutationResponse;
    readonly variables: EditOrAddSecretEditMutationVariables;
};



/*
mutation EditOrAddSecretEditMutation(
  $input: EditSecretInput!
) {
  editSecret(input: $input) {
    id
    key
    value
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input",
    "type": "EditSecretInput!"
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
    "concreteType": "Secret",
    "kind": "LinkedField",
    "name": "editSecret",
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
        "name": "key",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "value",
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
    "name": "EditOrAddSecretEditMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditOrAddSecretEditMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "EditOrAddSecretEditMutation",
    "operationKind": "mutation",
    "text": "mutation EditOrAddSecretEditMutation(\n  $input: EditSecretInput!\n) {\n  editSecret(input: $input) {\n    id\n    key\n    value\n  }\n}\n"
  }
};
})();
(node as any).hash = '9e5614a5162e0e14dc3d9d7abe22f9e4';
export default node;
