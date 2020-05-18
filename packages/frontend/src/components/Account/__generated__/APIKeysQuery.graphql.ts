/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type APIKeysQueryVariables = {};
export type APIKeysQueryResponse = {
    readonly viewer: {
        readonly id: string;
        readonly apiKeys: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly id: string;
                    readonly description: string;
                    readonly createdAt: unknown;
                };
            }>;
        };
    };
};
export type APIKeysQuery = {
    readonly response: APIKeysQueryResponse;
    readonly variables: APIKeysQueryVariables;
};



/*
query APIKeysQuery {
  viewer {
    id
    apiKeys(first: 10) {
      edges {
        node {
          id
          description
          createdAt
          __typename
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "APIKeyEdge",
    "kind": "LinkedField",
    "name": "edges",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "APIKey",
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "description",
            "storageKey": null
          },
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
            "name": "__typename",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "cursor",
        "storageKey": null
      }
    ],
    "storageKey": null
  },
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
        "name": "endCursor",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "hasNextPage",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
],
v2 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "APIKeysQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CurrentUser",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "alias": "apiKeys",
            "args": null,
            "concreteType": "APIKeyConnection",
            "kind": "LinkedField",
            "name": "__APIKeys_apiKeys_connection",
            "plural": false,
            "selections": (v1/*: any*/),
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "APIKeysQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CurrentUser",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "APIKeyConnection",
            "kind": "LinkedField",
            "name": "apiKeys",
            "plural": false,
            "selections": (v1/*: any*/),
            "storageKey": "apiKeys(first:10)"
          },
          {
            "alias": null,
            "args": (v2/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "APIKeys_apiKeys",
            "kind": "LinkedHandle",
            "name": "apiKeys"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {
      "connection": [
        {
          "count": null,
          "cursor": null,
          "direction": "forward",
          "path": [
            "viewer",
            "apiKeys"
          ]
        }
      ]
    },
    "name": "APIKeysQuery",
    "operationKind": "query",
    "text": "query APIKeysQuery {\n  viewer {\n    id\n    apiKeys(first: 10) {\n      edges {\n        node {\n          id\n          description\n          createdAt\n          __typename\n        }\n        cursor\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'f8ec2b50084bc1fc47f22a2356914c47';
export default node;
