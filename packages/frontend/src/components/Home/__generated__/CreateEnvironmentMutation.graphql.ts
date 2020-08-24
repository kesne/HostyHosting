/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type CreateEnvironmentInput = {
    organizationID: string;
    name: string;
    label: string;
};
export type CreateEnvironmentMutationVariables = {
    input: CreateEnvironmentInput;
};
export type CreateEnvironmentMutationResponse = {
    readonly createEnvironment: {
        readonly id: string;
        readonly name: string;
        readonly label: string;
    };
};
export type CreateEnvironmentMutation = {
    readonly response: CreateEnvironmentMutationResponse;
    readonly variables: CreateEnvironmentMutationVariables;
};



/*
mutation CreateEnvironmentMutation(
  $input: CreateEnvironmentInput!
) {
  createEnvironment(input: $input) {
    id
    name
    label
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
    "concreteType": "Environment",
    "kind": "LinkedField",
    "name": "createEnvironment",
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
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "label",
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
    "name": "CreateEnvironmentMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateEnvironmentMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "b940778b45b3b7b0bf9e8ab455511a6b",
    "id": null,
    "metadata": {},
    "name": "CreateEnvironmentMutation",
    "operationKind": "mutation",
    "text": "mutation CreateEnvironmentMutation(\n  $input: CreateEnvironmentInput!\n) {\n  createEnvironment(input: $input) {\n    id\n    name\n    label\n  }\n}\n"
  }
};
})();
(node as any).hash = '13f4364a30091f47a944792b4bac04ef';
export default node;
