/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ContainerSize = "S16x16" | "S1x1" | "S2x2" | "S4x4" | "S8x8" | "%future added value";
export type ContainerGroupQueryVariables = {
    component: string;
    environment: string;
};
export type ContainerGroupQueryResponse = {
    readonly component: {
        readonly id: string;
        readonly containerGroup: {
            readonly id: string;
            readonly monthlyPrice: number;
            readonly containerCount: number;
            readonly size: ContainerSize;
            readonly " $fragmentRefs": FragmentRefs<"Secrets_containerGroup">;
        } | null;
    };
};
export type ContainerGroupQuery = {
    readonly response: ContainerGroupQueryResponse;
    readonly variables: ContainerGroupQueryVariables;
};



/*
query ContainerGroupQuery(
  $component: ID!
  $environment: ID!
) {
  component(id: $component) {
    id
    containerGroup(environment: $environment) {
      id
      monthlyPrice
      containerCount
      size
      ...Secrets_containerGroup
    }
  }
}

fragment Secret_secret on Secret {
  id
  key
  value
}

fragment Secrets_containerGroup on ContainerGroup {
  id
  secrets {
    ...Secret_secret
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "component",
    "type": "ID!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "environment",
    "type": "ID!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "component"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = [
  {
    "kind": "Variable",
    "name": "environment",
    "variableName": "environment"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "monthlyPrice",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "containerCount",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "size",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ContainerGroupQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Component",
        "kind": "LinkedField",
        "name": "component",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": (v3/*: any*/),
            "concreteType": "ContainerGroup",
            "kind": "LinkedField",
            "name": "containerGroup",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "Secrets_containerGroup"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ContainerGroupQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Component",
        "kind": "LinkedField",
        "name": "component",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": (v3/*: any*/),
            "concreteType": "ContainerGroup",
            "kind": "LinkedField",
            "name": "containerGroup",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Secret",
                "kind": "LinkedField",
                "name": "secrets",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
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
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "ContainerGroupQuery",
    "operationKind": "query",
    "text": "query ContainerGroupQuery(\n  $component: ID!\n  $environment: ID!\n) {\n  component(id: $component) {\n    id\n    containerGroup(environment: $environment) {\n      id\n      monthlyPrice\n      containerCount\n      size\n      ...Secrets_containerGroup\n    }\n  }\n}\n\nfragment Secret_secret on Secret {\n  id\n  key\n  value\n}\n\nfragment Secrets_containerGroup on ContainerGroup {\n  id\n  secrets {\n    ...Secret_secret\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'ac57c126b5b5a1d8e6024ba6e49b06fe';
export default node;
