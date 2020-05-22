/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type EnvironmentsQueryVariables = {
    organization: string;
};
export type EnvironmentsQueryResponse = {
    readonly organization: {
        readonly id: string;
        readonly environments: ReadonlyArray<{
            readonly id: string;
            readonly name: string;
            readonly label: string;
        }>;
    };
};
export type EnvironmentsQuery = {
    readonly response: EnvironmentsQueryResponse;
    readonly variables: EnvironmentsQueryVariables;
};



/*
query EnvironmentsQuery(
  $organization: String!
) {
  organization(username: $organization) {
    id
    environments {
      id
      name
      label
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
        "concreteType": "Environment",
        "kind": "LinkedField",
        "name": "environments",
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
            "name": "label",
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
    "name": "EnvironmentsQuery",
    "selections": (v2/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EnvironmentsQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "EnvironmentsQuery",
    "operationKind": "query",
    "text": "query EnvironmentsQuery(\n  $organization: String!\n) {\n  organization(username: $organization) {\n    id\n    environments {\n      id\n      name\n      label\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'ae8c403052b83d189051909a0bd49aee';
export default node;
