/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type OrganizationsQueryVariables = {
    limit: number;
    offset: number;
};
export type OrganizationsQueryResponse = {
    readonly viewer: {
        readonly id: string;
        readonly organizations: {
            readonly pageInfo: {
                readonly startCursor: string | null;
                readonly endCursor: string | null;
                readonly hasPreviousPage: boolean;
                readonly hasNextPage: boolean;
            };
            readonly edges: ReadonlyArray<{
                readonly cursor: string;
                readonly node: {
                    readonly id: string;
                };
            }>;
        };
    };
};
export type OrganizationsQuery = {
    readonly response: OrganizationsQueryResponse;
    readonly variables: OrganizationsQueryVariables;
};



/*
query OrganizationsQuery(
  $limit: Int!
  $offset: Int!
) {
  viewer {
    id
    organizations(limit: $limit, offset: $offset) {
      pageInfo {
        startCursor
        endCursor
        hasPreviousPage
        hasNextPage
      }
      edges {
        cursor
        node {
          id
        }
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
    "name": "limit"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "offset"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "viewer",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      {
        "alias": null,
        "args": [
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
        "concreteType": "OrganizationMembershipConnection",
        "kind": "LinkedField",
        "name": "organizations",
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
                "name": "startCursor",
                "storageKey": null
              },
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
                "name": "hasPreviousPage",
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
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "OrganizationMembershipEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cursor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "OrganizationMembership",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v1/*: any*/)
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "OrganizationsQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "OrganizationsQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "b0bfd1d5583c73e71e9e0d4599d9d901",
    "id": null,
    "metadata": {},
    "name": "OrganizationsQuery",
    "operationKind": "query",
    "text": "query OrganizationsQuery(\n  $limit: Int!\n  $offset: Int!\n) {\n  viewer {\n    id\n    organizations(limit: $limit, offset: $offset) {\n      pageInfo {\n        startCursor\n        endCursor\n        hasPreviousPage\n        hasNextPage\n      }\n      edges {\n        cursor\n        node {\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '0bd84662cae5d584a12cd2e1cd5c77b0';
export default node;
