/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type ApplicationQueryVariables = {
    organization: string;
    application: string;
};
export type ApplicationQueryResponse = {
    readonly organization: {
        readonly id: string;
        readonly name: string;
        readonly application: {
            readonly id: string;
            readonly name: string;
            readonly label: string;
        };
    };
};
export type ApplicationQuery = {
    readonly response: ApplicationQueryResponse;
    readonly variables: ApplicationQueryVariables;
};



/*
query ApplicationQuery(
  $organization: String!
  $application: String!
) {
  organization(username: $organization) {
    id
    name
    application(name: $application) {
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
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "application",
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
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = [
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
      (v2/*: any*/),
      {
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "name",
            "variableName": "application"
          }
        ],
        "concreteType": "Application",
        "kind": "LinkedField",
        "name": "application",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
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
    "name": "ApplicationQuery",
    "selections": (v3/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ApplicationQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "ApplicationQuery",
    "operationKind": "query",
    "text": "query ApplicationQuery(\n  $organization: String!\n  $application: String!\n) {\n  organization(username: $organization) {\n    id\n    name\n    application(name: $application) {\n      id\n      name\n      label\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'c8f57322c295b88d1b2cfa0f2c919201';
export default node;
