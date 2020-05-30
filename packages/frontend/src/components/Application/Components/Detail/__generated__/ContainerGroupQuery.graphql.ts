/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ContainerSize = "S16x16" | "S1x1" | "S2x2" | "S4x4" | "S8x8" | "%future added value";
export type ContainerGroupQueryVariables = {
    component: string;
    environment: string;
    limit: number;
    offset?: number | null;
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
  $limit: Int!
  $offset: Int
) {
  component(id: $component) {
    id
    containerGroup(environment: $environment) {
      id
      monthlyPrice
      containerCount
      size
      ...Secrets_containerGroup_21LIQA
    }
  }
}

fragment Secret_secret on Secret {
  id
  key
  value
}

fragment Secrets_containerGroup_21LIQA on ContainerGroup {
  id
  secrets(limit: $limit, offset: $offset) {
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
    edges {
      node {
        ...Secret_secret
        id
      }
    }
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
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "limit",
    "type": "Int!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "offset",
    "type": "Int"
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
},
v7 = [
  {
    "kind": "Variable",
    "name": "limit",
    "variableName": "limit"
  },
  {
    "kind": "Variable",
    "name": "offset",
    "variableName": "offset"
  }
];
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
                "args": (v7/*: any*/),
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
                "args": (v7/*: any*/),
                "concreteType": "SecretConnection",
                "kind": "LinkedField",
                "name": "secrets",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageInfo",
                    "kind": "LinkedField",
                    "name": "pageInfo",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "hasNextPage",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "hasPreviousPage",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "SecretEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Secret",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
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
    "text": "query ContainerGroupQuery(\n  $component: ID!\n  $environment: ID!\n  $limit: Int!\n  $offset: Int\n) {\n  component(id: $component) {\n    id\n    containerGroup(environment: $environment) {\n      id\n      monthlyPrice\n      containerCount\n      size\n      ...Secrets_containerGroup_21LIQA\n    }\n  }\n}\n\nfragment Secret_secret on Secret {\n  id\n  key\n  value\n}\n\nfragment Secrets_containerGroup_21LIQA on ContainerGroup {\n  id\n  secrets(limit: $limit, offset: $offset) {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n    }\n    edges {\n      node {\n        ...Secret_secret\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '7427a894df8faf5d71f04157cbd0c664';
export default node;
