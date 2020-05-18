/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type CreateSecretInput = {
    containerGroupID: string;
    key: string;
    value: string;
};
export type EditOrAddSecretAddMutationVariables = {
    input: CreateSecretInput;
};
export type EditOrAddSecretAddMutationResponse = {
    readonly createSecret: {
        readonly id: string;
        readonly key: string;
        readonly value: string;
    };
};
export type EditOrAddSecretAddMutation = {
    readonly response: EditOrAddSecretAddMutationResponse;
    readonly variables: EditOrAddSecretAddMutationVariables;
};



/*
mutation EditOrAddSecretAddMutation(
  $input: CreateSecretInput!
) {
  createSecret(input: $input) {
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
    "type": "CreateSecretInput!"
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
    "name": "createSecret",
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
    "name": "EditOrAddSecretAddMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditOrAddSecretAddMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "EditOrAddSecretAddMutation",
    "operationKind": "mutation",
    "text": "mutation EditOrAddSecretAddMutation(\n  $input: CreateSecretInput!\n) {\n  createSecret(input: $input) {\n    id\n    key\n    value\n  }\n}\n"
  }
};
})();
(node as any).hash = '2bda51be956ea37a648d3b85ad724f2d';
export default node;
