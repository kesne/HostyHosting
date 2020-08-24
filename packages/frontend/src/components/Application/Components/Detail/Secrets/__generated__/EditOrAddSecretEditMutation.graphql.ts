/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UpdateSecretInput = {
    secretID: string;
    key: string;
    value: string;
};
export type EditOrAddSecretEditMutationVariables = {
    input: UpdateSecretInput;
};
export type EditOrAddSecretEditMutationResponse = {
    readonly updateSecret: {
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
  $input: UpdateSecretInput!
) {
  updateSecret(input: $input) {
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
    "concreteType": "Secret",
    "kind": "LinkedField",
    "name": "updateSecret",
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
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditOrAddSecretEditMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "22d053c74bcc910104cc6daebf333f5e",
    "id": null,
    "metadata": {},
    "name": "EditOrAddSecretEditMutation",
    "operationKind": "mutation",
    "text": "mutation EditOrAddSecretEditMutation(\n  $input: UpdateSecretInput!\n) {\n  updateSecret(input: $input) {\n    id\n    key\n    value\n  }\n}\n"
  }
};
})();
(node as any).hash = '27c646292e8a92a333e86fa247332ce6';
export default node;
