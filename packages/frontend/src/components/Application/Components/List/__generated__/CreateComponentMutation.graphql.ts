/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type DeploymentStrategy = "RECREATE" | "REPLACE" | "%future added value";
export type ComponentInput = {
    image?: string | null;
    name?: string | null;
    deploymentStrategy?: DeploymentStrategy | null;
};
export type CreateComponentMutationVariables = {
    application: string;
    component: ComponentInput;
};
export type CreateComponentMutationResponse = {
    readonly application: {
        readonly createComponent: {
            readonly id: string;
            readonly name: string;
            readonly image: string;
        };
    };
};
export type CreateComponentMutation = {
    readonly response: CreateComponentMutationResponse;
    readonly variables: CreateComponentMutationVariables;
};



/*
mutation CreateComponentMutation(
  $application: ID!
  $component: ComponentInput!
) {
  application(id: $application) {
    createComponent(component: $component) {
      id
      name
      image
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "application",
    "type": "ID!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "component",
    "type": "ComponentInput!"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "application"
      }
    ],
    "concreteType": "ApplicationMutations",
    "kind": "LinkedField",
    "name": "application",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "component",
            "variableName": "component"
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
    "text": "mutation CreateComponentMutation(\n  $application: ID!\n  $component: ComponentInput!\n) {\n  application(id: $application) {\n    createComponent(component: $component) {\n      id\n      name\n      image\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'c1808ce4883beffb2e8fefc473adebe6';
export default node;
