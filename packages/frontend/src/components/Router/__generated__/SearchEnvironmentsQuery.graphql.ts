/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type SearchEnvironmentsQueryVariables = {
    organization: string;
};
export type SearchEnvironmentsQueryResponse = {
    readonly organization: {
        readonly environments: ReadonlyArray<{
            readonly id: string;
            readonly label: string;
            readonly name: string;
        }>;
    };
};
export type SearchEnvironmentsQuery = {
    readonly response: SearchEnvironmentsQueryResponse;
    readonly variables: SearchEnvironmentsQueryVariables;
};



/*
query SearchEnvironmentsQuery(
  $organization: String!
) {
  organization(username: $organization) {
    environments {
      id
      label
      name
    }
    id
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
  "concreteType": "Environment",
  "kind": "LinkedField",
  "name": "environments",
  "plural": true,
  "selections": [
    (v2/*: any*/),
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
      "name": "name",
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
    "name": "SearchEnvironmentsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Organization",
        "kind": "LinkedField",
        "name": "organization",
        "plural": false,
        "selections": [
          (v3/*: any*/)
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
    "name": "SearchEnvironmentsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Organization",
        "kind": "LinkedField",
        "name": "organization",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "SearchEnvironmentsQuery",
    "operationKind": "query",
    "text": "query SearchEnvironmentsQuery(\n  $organization: String!\n) {\n  organization(username: $organization) {\n    environments {\n      id\n      label\n      name\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '00a5d8295d71d12ad5055b07e339d64e';
export default node;
