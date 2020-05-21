/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type ApplicationsQueryVariables = {
    organization?: string | null;
};
export type ApplicationsQueryResponse = {
    readonly organization: {
        readonly id: string;
        readonly username: string;
        readonly applications: ReadonlyArray<{
            readonly id: string;
            readonly name: string;
            readonly description: string;
        }>;
    };
};
export type ApplicationsQuery = {
    readonly response: ApplicationsQueryResponse;
    readonly variables: ApplicationsQueryVariables;
};



/*
query ApplicationsQuery(
  $organization: String
) {
  organization(username: $organization) {
    id
    username
    applications {
      id
      name
      description
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
    "type": "String"
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
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "username",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Application",
        "kind": "LinkedField",
        "name": "applications",
        "plural": true,
        "selections": [
          (v1/*: any*/),
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
            "name": "description",
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
    "name": "ApplicationsQuery",
    "selections": (v2/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ApplicationsQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "ApplicationsQuery",
    "operationKind": "query",
    "text": "query ApplicationsQuery(\n  $organization: String\n) {\n  organization(username: $organization) {\n    id\n    username\n    applications {\n      id\n      name\n      description\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'f5d458579d1ce38a6d6e993776608b49';
export default node;
