/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type OrganizationPermission = "ADMIN" | "READ" | "WRITE" | "%future added value";
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
                    readonly permission: OrganizationPermission;
                    readonly organization: {
                        readonly id: string;
                        readonly name: string;
                    };
                    readonly " $fragmentRefs": FragmentRefs<"RemoveMembership_organizationMembership">;
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
          permission
          organization {
            id
            name
          }
          ...RemoveMembership_organizationMembership
        }
      }
    }
  }
}

fragment RemoveMembership_organizationMembership on OrganizationMembership {
  id
  user {
    id
    name
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
v3 = {
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
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "permission",
  "storageKey": null
},
v6 = [
  (v1/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
],
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "Organization",
  "kind": "LinkedField",
  "name": "organization",
  "plural": false,
  "selections": (v6/*: any*/),
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "OrganizationsQuery",
    "selections": [
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
            "args": (v2/*: any*/),
            "concreteType": "OrganizationMembershipConnection",
            "kind": "LinkedField",
            "name": "organizations",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "OrganizationMembershipEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "OrganizationMembership",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      (v5/*: any*/),
                      (v7/*: any*/),
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "RemoveMembership_organizationMembership"
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
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "OrganizationsQuery",
    "selections": [
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
            "args": (v2/*: any*/),
            "concreteType": "OrganizationMembershipConnection",
            "kind": "LinkedField",
            "name": "organizations",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "OrganizationMembershipEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "OrganizationMembership",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      (v5/*: any*/),
                      (v7/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "User",
                        "kind": "LinkedField",
                        "name": "user",
                        "plural": false,
                        "selections": (v6/*: any*/),
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
    "cacheID": "cd98c6a36128cf573619f7c0fcf67960",
    "id": null,
    "metadata": {},
    "name": "OrganizationsQuery",
    "operationKind": "query",
    "text": "query OrganizationsQuery(\n  $limit: Int!\n  $offset: Int!\n) {\n  viewer {\n    id\n    organizations(limit: $limit, offset: $offset) {\n      pageInfo {\n        startCursor\n        endCursor\n        hasPreviousPage\n        hasNextPage\n      }\n      edges {\n        cursor\n        node {\n          id\n          permission\n          organization {\n            id\n            name\n          }\n          ...RemoveMembership_organizationMembership\n        }\n      }\n    }\n  }\n}\n\nfragment RemoveMembership_organizationMembership on OrganizationMembership {\n  id\n  user {\n    id\n    name\n  }\n}\n"
  }
};
})();
(node as any).hash = '55588e6c0b26d306b4b17dc1a80ef6d5';
export default node;
