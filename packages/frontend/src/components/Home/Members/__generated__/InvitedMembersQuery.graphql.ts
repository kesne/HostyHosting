/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type InvitedMembersQueryVariables = {
    organization: string;
    limit: number;
    offset?: number | null;
};
export type InvitedMembersQueryResponse = {
    readonly organization: {
        readonly invites: {
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
                    readonly " $fragmentRefs": FragmentRefs<"InvitedMember_OrganizationInvite">;
                };
            }>;
        };
    };
};
export type InvitedMembersQuery = {
    readonly response: InvitedMembersQueryResponse;
    readonly variables: InvitedMembersQueryVariables;
};



/*
query InvitedMembersQuery(
  $organization: String!
  $limit: Int!
  $offset: Int
) {
  organization(username: $organization) {
    invites(limit: $limit, offset: $offset) {
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
          ...InvitedMember_OrganizationInvite
        }
      }
    }
    id
  }
}

fragment InvitedMember_OrganizationInvite on OrganizationInvite {
  id
  name
  permission
  email
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "limit"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "offset"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "organization"
},
v3 = [
  {
    "kind": "Variable",
    "name": "username",
    "variableName": "organization"
  }
],
v4 = [
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
v5 = {
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
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "InvitedMembersQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Organization",
        "kind": "LinkedField",
        "name": "organization",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v4/*: any*/),
            "concreteType": "OrganizationInviteConnection",
            "kind": "LinkedField",
            "name": "invites",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "OrganizationInviteEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  (v6/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "OrganizationInvite",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v7/*: any*/),
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "InvitedMember_OrganizationInvite"
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
    "argumentDefinitions": [
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "InvitedMembersQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Organization",
        "kind": "LinkedField",
        "name": "organization",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v4/*: any*/),
            "concreteType": "OrganizationInviteConnection",
            "kind": "LinkedField",
            "name": "invites",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "OrganizationInviteEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  (v6/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "OrganizationInvite",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v7/*: any*/),
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
                        "name": "permission",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "email",
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
          },
          (v7/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "9423ba2852c702ff819bf894cd5a60c3",
    "id": null,
    "metadata": {},
    "name": "InvitedMembersQuery",
    "operationKind": "query",
    "text": "query InvitedMembersQuery(\n  $organization: String!\n  $limit: Int!\n  $offset: Int\n) {\n  organization(username: $organization) {\n    invites(limit: $limit, offset: $offset) {\n      pageInfo {\n        startCursor\n        endCursor\n        hasPreviousPage\n        hasNextPage\n      }\n      edges {\n        cursor\n        node {\n          id\n          ...InvitedMember_OrganizationInvite\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment InvitedMember_OrganizationInvite on OrganizationInvite {\n  id\n  name\n  permission\n  email\n}\n"
  }
};
})();
(node as any).hash = '1a54761c820bc8f2e6d8246f23442c30';
export default node;
