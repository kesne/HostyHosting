/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ApplicationsQueryVariables = {
    organization: string;
    limit: number;
    offset?: number | null;
};
export type ApplicationsQueryResponse = {
    readonly organization: {
        readonly id: string;
        readonly username: string;
        readonly " $fragmentRefs": FragmentRefs<"ApplicationsListFragment_organization">;
    };
};
export type ApplicationsQuery = {
    readonly response: ApplicationsQueryResponse;
    readonly variables: ApplicationsQueryVariables;
};



/*
query ApplicationsQuery(
  $organization: String!
  $limit: Int!
  $offset: Int
) {
  organization(username: $organization) {
    id
    username
    ...ApplicationsListFragment_organization
  }
}

fragment ApplicationsListFragment_organization on Organization {
  username
  applications(limit: $limit, offset: $offset) {
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
        name
        label
        description
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
    "name": "organization",
    "type": "String!"
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
    "name": "username",
    "variableName": "organization"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ApplicationsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Organization",
        "kind": "LinkedField",
        "name": "organization",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ApplicationsListFragment_organization"
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
    "name": "ApplicationsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Organization",
        "kind": "LinkedField",
        "name": "organization",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
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
            "concreteType": "ApplicationConnection",
            "kind": "LinkedField",
            "name": "applications",
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
                "concreteType": "ApplicationEdge",
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
                    "concreteType": "Application",
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
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "label",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "description",
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
    "name": "ApplicationsQuery",
    "operationKind": "query",
    "text": "query ApplicationsQuery(\n  $organization: String!\n  $limit: Int!\n  $offset: Int\n) {\n  organization(username: $organization) {\n    id\n    username\n    ...ApplicationsListFragment_organization\n  }\n}\n\nfragment ApplicationsListFragment_organization on Organization {\n  username\n  applications(limit: $limit, offset: $offset) {\n    pageInfo {\n      startCursor\n      endCursor\n      hasPreviousPage\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        id\n        name\n        label\n        description\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '53156b38a7ea0aaa23fef7079580f996';
export default node;
