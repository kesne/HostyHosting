/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type DeploymentStrategy = "RECREATE" | "REPLACE" | "%future added value";
export type CreateComponentInput = {
    applicationID: string;
    name: string;
    label: string;
    image: string;
    deploymentStrategy: DeploymentStrategy;
};
export type CreateComponentMutationVariables = {
    input: CreateComponentInput;
};
export type CreateComponentMutationResponse = {
    readonly createComponent: {
        readonly id: string;
        readonly name: string;
        readonly image: string;
    };
};
export type CreateComponentMutation = {
    readonly response: CreateComponentMutationResponse;
    readonly variables: CreateComponentMutationVariables;
};



/*
mutation CreateComponentMutation(
  $input: CreateComponentInput!
) {
  createComponent(input: $input) {
    id
    name
    image
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input",
    "type": "CreateComponentInput!"
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
    "concreteType": "Component",
    "kind": "LinkedField",
    "name": "createComponent",
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
        "name": "image",
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
    "name": "CreateComponentMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateComponentMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "CreateComponentMutation",
    "operationKind": "mutation",
    "text": "mutation CreateComponentMutation(\n  $input: CreateComponentInput!\n) {\n  createComponent(input: $input) {\n    id\n    name\n    image\n  }\n}\n"
  }
};
})();
(node as any).hash = 'dff2373ce497bd49ff51510282ada263';
export default node;
