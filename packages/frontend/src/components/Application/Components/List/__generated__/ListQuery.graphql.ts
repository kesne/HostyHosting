/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ListQueryVariables = {
    application: string;
    limit: number;
    offset: number;
};
export type ListQueryResponse = {
    readonly application: {
        readonly id: string;
        readonly components: {
            readonly pageInfo: {
                readonly hasNextPage: boolean;
                readonly hasPreviousPage: boolean;
            };
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly " $fragmentRefs": FragmentRefs<"Component_component">;
                };
            }>;
        };
    };
};
export type ListQuery = {
    readonly response: ListQueryResponse;
    readonly variables: ListQueryVariables;
};



/*
query ListQuery(
  $application: ID!
  $limit: Int!
  $offset: Int!
) {
  application(id: $application) {
    id
    components(limit: $limit, offset: $offset) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          ...Component_component
          id
        }
      }
    }
  }
}

fragment Component_component on Component {
  id
  name
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
    "name": "limit",
    "type": "Int!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "offset",
    "type": "Int!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "application"
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
    "name": "limit",
    "variableName": "limit"
  },
  {
    "kind": "Variable",
    "name": "offset",
    "variableName": "offset"
  }
],
v4 = {
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ListQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Application",
        "kind": "LinkedField",
        "name": "application",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": (v3/*: any*/),
            "concreteType": "ComponentConnection",
            "kind": "LinkedField",
            "name": "components",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ComponentEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Component",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "Component_component"
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
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ListQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Application",
        "kind": "LinkedField",
        "name": "application",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": (v3/*: any*/),
            "concreteType": "ComponentConnection",
            "kind": "LinkedField",
            "name": "components",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ComponentEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Component",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "name",
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
    "name": "ListQuery",
    "operationKind": "query",
    "text": "query ListQuery(\n  $application: ID!\n  $limit: Int!\n  $offset: Int!\n) {\n  application(id: $application) {\n    id\n    components(limit: $limit, offset: $offset) {\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n      }\n      edges {\n        node {\n          ...Component_component\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment Component_component on Component {\n  id\n  name\n}\n"
  }
};
})();
(node as any).hash = '67a986902337dda520fb58cec61dad23';
export default node;
