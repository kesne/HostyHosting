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
        readonly application: {
            readonly id: string;
        };
        readonly containerGroup: {
            readonly id: string;
            readonly monthlyPrice: number;
            readonly containerCount: number;
            readonly size: ContainerSize;
            readonly organization: {
                readonly username: string;
            };
            readonly environment: {
                readonly id: string;
            };
            readonly routerRules: ReadonlyArray<{
                readonly id: string;
                readonly domain: string;
                readonly pathPrefix: string | null;
                readonly forwardPathPrefix: boolean | null;
            }>;
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
    application {
      id
    }
    containerGroup(environment: $environment) {
      id
      monthlyPrice
      containerCount
      size
      organization {
        username
        id
      }
      environment {
        id
      }
      routerRules {
        id
        domain
        pathPrefix
        forwardPathPrefix
      }
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
  (v2/*: any*/)
],
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "Application",
  "kind": "LinkedField",
  "name": "application",
  "plural": false,
  "selections": (v3/*: any*/),
  "storageKey": null
},
v5 = [
  {
    "kind": "Variable",
    "name": "environment",
    "variableName": "environment"
  }
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "monthlyPrice",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "containerCount",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "size",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "concreteType": "Environment",
  "kind": "LinkedField",
  "name": "environment",
  "plural": false,
  "selections": (v3/*: any*/),
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "concreteType": "RouterRule",
  "kind": "LinkedField",
  "name": "routerRules",
  "plural": true,
  "selections": [
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "domain",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "pathPrefix",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "forwardPathPrefix",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v12 = [
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
          (v4/*: any*/),
          {
            "alias": null,
            "args": (v5/*: any*/),
            "concreteType": "ContainerGroup",
            "kind": "LinkedField",
            "name": "containerGroup",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Organization",
                "kind": "LinkedField",
                "name": "organization",
                "plural": false,
                "selections": [
                  (v9/*: any*/)
                ],
                "storageKey": null
              },
              (v10/*: any*/),
              (v11/*: any*/),
              {
                "args": (v12/*: any*/),
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
          (v4/*: any*/),
          {
            "alias": null,
            "args": (v5/*: any*/),
            "concreteType": "ContainerGroup",
            "kind": "LinkedField",
            "name": "containerGroup",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Organization",
                "kind": "LinkedField",
                "name": "organization",
                "plural": false,
                "selections": [
                  (v9/*: any*/),
                  (v2/*: any*/)
                ],
                "storageKey": null
              },
              (v10/*: any*/),
              (v11/*: any*/),
              {
                "alias": null,
                "args": (v12/*: any*/),
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
    "text": "query ContainerGroupQuery(\n  $component: ID!\n  $environment: ID!\n  $limit: Int!\n  $offset: Int\n) {\n  component(id: $component) {\n    id\n    application {\n      id\n    }\n    containerGroup(environment: $environment) {\n      id\n      monthlyPrice\n      containerCount\n      size\n      organization {\n        username\n        id\n      }\n      environment {\n        id\n      }\n      routerRules {\n        id\n        domain\n        pathPrefix\n        forwardPathPrefix\n      }\n      ...Secrets_containerGroup_21LIQA\n    }\n  }\n}\n\nfragment Secret_secret on Secret {\n  id\n  key\n  value\n}\n\nfragment Secrets_containerGroup_21LIQA on ContainerGroup {\n  id\n  secrets(limit: $limit, offset: $offset) {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n    }\n    edges {\n      node {\n        ...Secret_secret\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'a765c6be44fe18039a5b53de2ddabdaf';
export default node;
