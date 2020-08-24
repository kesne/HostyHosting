/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type OrganizationPermission = "ADMIN" | "READ" | "WRITE" | "%future added value";
export type MembersQueryVariables = {
    organization: string;
    limit: number;
    offset?: number | null;
};
export type MembersQueryResponse = {
    readonly organization: {
        readonly id: string;
        readonly isPersonal: boolean;
        readonly membership: {
            readonly id: string;
            readonly permission: OrganizationPermission;
        };
        readonly members: {
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
                    readonly createdAt: string;
                    readonly user: {
                        readonly id: string;
                        readonly name: string;
                        readonly username: string;
                    };
                    readonly " $fragmentRefs": FragmentRefs<"EditMembership_organizationMembership" | "RemoveMembership_organizationMembership">;
                };
            }>;
        };
        readonly " $fragmentRefs": FragmentRefs<"InviteMember_organization">;
    };
};
export type MembersQuery = {
    readonly response: MembersQueryResponse;
    readonly variables: MembersQueryVariables;
};



/*
query MembersQuery(
  $organization: String!
  $limit: Int!
  $offset: Int
) {
  organization(username: $organization) {
    id
    isPersonal
    membership {
      id
      permission
    }
    members(limit: $limit, offset: $offset) {
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
          createdAt
          user {
            id
            name
            username
          }
          ...EditMembership_organizationMembership
          ...RemoveMembership_organizationMembership
        }
      }
    }
    ...InviteMember_organization
  }
}

fragment EditMembership_organizationMembership on OrganizationMembership {
  id
  permission
  user {
    id
    name
  }
}

fragment InviteMember_organization on Organization {
  id
  membership {
    id
    permission
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
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isPersonal",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "permission",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "OrganizationMembership",
  "kind": "LinkedField",
  "name": "membership",
  "plural": false,
  "selections": [
    (v4/*: any*/),
    (v6/*: any*/)
  ],
  "storageKey": null
},
v8 = [
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
v9 = {
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
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "user",
  "plural": false,
  "selections": [
    (v4/*: any*/),
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
      "name": "username",
      "storageKey": null
    }
  ],
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
    "name": "MembersQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Organization",
        "kind": "LinkedField",
        "name": "organization",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          (v5/*: any*/),
          (v7/*: any*/),
          {
            "alias": null,
            "args": (v8/*: any*/),
            "concreteType": "OrganizationMembershipConnection",
            "kind": "LinkedField",
            "name": "members",
            "plural": false,
            "selections": [
              (v9/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "OrganizationMembershipEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  (v10/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "OrganizationMembership",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      (v6/*: any*/),
                      (v11/*: any*/),
                      (v12/*: any*/),
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "EditMembership_organizationMembership"
                      },
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
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "InviteMember_organization"
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
    "name": "MembersQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Organization",
        "kind": "LinkedField",
        "name": "organization",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          (v5/*: any*/),
          (v7/*: any*/),
          {
            "alias": null,
            "args": (v8/*: any*/),
            "concreteType": "OrganizationMembershipConnection",
            "kind": "LinkedField",
            "name": "members",
            "plural": false,
            "selections": [
              (v9/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "OrganizationMembershipEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  (v10/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "OrganizationMembership",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      (v6/*: any*/),
                      (v11/*: any*/),
                      (v12/*: any*/)
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
    "cacheID": "c2c197c019a2929beee621e5692a2534",
    "id": null,
    "metadata": {},
    "name": "MembersQuery",
    "operationKind": "query",
    "text": "query MembersQuery(\n  $organization: String!\n  $limit: Int!\n  $offset: Int\n) {\n  organization(username: $organization) {\n    id\n    isPersonal\n    membership {\n      id\n      permission\n    }\n    members(limit: $limit, offset: $offset) {\n      pageInfo {\n        startCursor\n        endCursor\n        hasPreviousPage\n        hasNextPage\n      }\n      edges {\n        cursor\n        node {\n          id\n          permission\n          createdAt\n          user {\n            id\n            name\n            username\n          }\n          ...EditMembership_organizationMembership\n          ...RemoveMembership_organizationMembership\n        }\n      }\n    }\n    ...InviteMember_organization\n  }\n}\n\nfragment EditMembership_organizationMembership on OrganizationMembership {\n  id\n  permission\n  user {\n    id\n    name\n  }\n}\n\nfragment InviteMember_organization on Organization {\n  id\n  membership {\n    id\n    permission\n  }\n}\n\nfragment RemoveMembership_organizationMembership on OrganizationMembership {\n  id\n  user {\n    id\n    name\n  }\n}\n"
  }
};
})();
(node as any).hash = 'bae4314143eb637dc543cfd04f1ee31b';
export default node;
