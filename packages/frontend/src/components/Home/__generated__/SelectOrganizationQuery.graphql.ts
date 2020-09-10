/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type SelectOrganizationQueryVariables = {
    organization: string;
};
export type SelectOrganizationQueryResponse = {
    readonly viewer: {
        readonly id: string;
        readonly personalOrganization: {
            readonly id: string;
            readonly username: string;
        };
        readonly organizations: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly organization: {
                        readonly id: string;
                        readonly name: string;
                        readonly username: string;
                    };
                };
            }>;
        };
    };
    readonly organization: {
        readonly id: string;
        readonly name: string;
        readonly username: string;
        readonly isPersonal: boolean;
        readonly memberCount: number;
    };
};
export type SelectOrganizationQuery = {
    readonly response: SelectOrganizationQueryResponse;
    readonly variables: SelectOrganizationQueryVariables;
};



/*
query SelectOrganizationQuery(
  $organization: String!
) {
  viewer {
    id
    personalOrganization {
      id
      username
    }
    organizations(limit: 20) {
      edges {
        node {
          organization {
            id
            name
            username
          }
          id
        }
      }
    }
  }
  organization(username: $organization) {
    id
    name
    username
    isPersonal
    memberCount
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "organization"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "concreteType": "Organization",
  "kind": "LinkedField",
  "name": "personalOrganization",
  "plural": false,
  "selections": [
    (v1/*: any*/),
    (v2/*: any*/)
  ],
  "storageKey": null
},
v4 = [
  {
    "kind": "Literal",
    "name": "limit",
    "value": 20
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "Organization",
  "kind": "LinkedField",
  "name": "organization",
  "plural": false,
  "selections": [
    (v1/*: any*/),
    (v5/*: any*/),
    (v2/*: any*/)
  ],
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": [
    {
      "kind": "Variable",
      "name": "username",
      "variableName": "organization"
    }
  ],
  "concreteType": "Organization",
  "kind": "LinkedField",
  "name": "organization",
  "plural": false,
  "selections": [
    (v1/*: any*/),
    (v5/*: any*/),
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isPersonal",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "memberCount",
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
    "name": "SelectOrganizationQuery",
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
          (v3/*: any*/),
          {
            "alias": null,
            "args": (v4/*: any*/),
            "concreteType": "OrganizationMembershipConnection",
            "kind": "LinkedField",
            "name": "organizations",
            "plural": false,
            "selections": [
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
                    "concreteType": "OrganizationMembership",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "organizations(limit:20)"
          }
        ],
        "storageKey": null
      },
      (v7/*: any*/)
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SelectOrganizationQuery",
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
          (v3/*: any*/),
          {
            "alias": null,
            "args": (v4/*: any*/),
            "concreteType": "OrganizationMembershipConnection",
            "kind": "LinkedField",
            "name": "organizations",
            "plural": false,
            "selections": [
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
                    "concreteType": "OrganizationMembership",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/),
                      (v1/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "organizations(limit:20)"
          }
        ],
        "storageKey": null
      },
      (v7/*: any*/)
    ]
  },
  "params": {
    "cacheID": "4eeeb58d2f66390d6476f283280f4a88",
    "id": null,
    "metadata": {},
    "name": "SelectOrganizationQuery",
    "operationKind": "query",
    "text": "query SelectOrganizationQuery(\n  $organization: String!\n) {\n  viewer {\n    id\n    personalOrganization {\n      id\n      username\n    }\n    organizations(limit: 20) {\n      edges {\n        node {\n          organization {\n            id\n            name\n            username\n          }\n          id\n        }\n      }\n    }\n  }\n  organization(username: $organization) {\n    id\n    name\n    username\n    isPersonal\n    memberCount\n  }\n}\n"
  }
};
})();
(node as any).hash = '04abc80071b9c20a5b50104d47827e9f';
export default node;
