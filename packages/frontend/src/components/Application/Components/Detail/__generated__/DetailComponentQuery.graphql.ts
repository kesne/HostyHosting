/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type DeploymentStrategy = "RECREATE" | "REPLACE" | "%future added value";
export type DetailComponentQueryVariables = {
    application: string;
    component: string;
};
export type DetailComponentQueryResponse = {
    readonly application: {
        readonly id: string;
        readonly environments: ReadonlyArray<{
            readonly id: string;
            readonly name: string;
            readonly label: string;
        }>;
        readonly component: {
            readonly id: string;
            readonly name: string;
            readonly createdAt: unknown;
            readonly updatedAt: unknown;
            readonly deploymentStrategy: DeploymentStrategy;
        };
    };
};
export type DetailComponentQuery = {
    readonly response: DetailComponentQueryResponse;
    readonly variables: DetailComponentQueryVariables;
};



/*
query DetailComponentQuery(
  $application: ID!
  $component: ID!
) {
  application(id: $application) {
    id
    environments {
      id
      name
      label
    }
    component(id: $component) {
      id
      name
      createdAt
      updatedAt
      deploymentStrategy
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
    "type": "ID!"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "application"
      }
    ],
    "concreteType": "Application",
    "kind": "LinkedField",
    "name": "application",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "Environment",
        "kind": "LinkedField",
        "name": "environments",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "label",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "component"
          }
        ],
        "concreteType": "Component",
        "kind": "LinkedField",
        "name": "component",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "createdAt",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "updatedAt",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "deploymentStrategy",
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
    "name": "DetailComponentQuery",
    "selections": (v3/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DetailComponentQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "DetailComponentQuery",
    "operationKind": "query",
    "text": "query DetailComponentQuery(\n  $application: ID!\n  $component: ID!\n) {\n  application(id: $application) {\n    id\n    environments {\n      id\n      name\n      label\n    }\n    component(id: $component) {\n      id\n      name\n      createdAt\n      updatedAt\n      deploymentStrategy\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '04a3efdf72055431a8a1ae17981a21cb';
export default node;
