/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

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
                    readonly createdAt: string;
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
    apiKeys(limit: 10) {
      edges {
        node {
          id
          description
          createdAt
        }
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
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "viewer",
    "plural": false,
    "selections": [
      (v0/*: any*/),
      {
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "limit",
            "value": 10
          }
        ],
        "concreteType": "APIKeyConnection",
        "kind": "LinkedField",
        "name": "apiKeys",
        "plural": false,
        "selections": [
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
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "apiKeys(limit:10)"
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "APIKeysQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "APIKeysQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "36d677f84801ba5abef24cd37091d462",
    "id": null,
    "metadata": {},
    "name": "APIKeysQuery",
    "operationKind": "query",
    "text": "query APIKeysQuery {\n  viewer {\n    id\n    apiKeys(limit: 10) {\n      edges {\n        node {\n          id\n          description\n          createdAt\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '1eb6ef2339bb179c4546e8406e010c9e';
export default node;
