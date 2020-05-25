/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type RoutersQueryVariables = {
    organization: string;
};
export type RoutersQueryResponse = {
    readonly organization: {
        readonly id: string;
        readonly username: string;
        readonly routers: ReadonlyArray<{
            readonly id: string;
            readonly label: string;
        }>;
    };
};
export type RoutersQuery = {
    readonly response: RoutersQueryResponse;
    readonly variables: RoutersQueryVariables;
};



/*
query RoutersQuery(
  $organization: String!
) {
  organization(username: $organization) {
    id
    username
    routers {
      id
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
        "kind": "ScalarField",
        "name": "username",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Router",
        "kind": "LinkedField",
        "name": "routers",
        "plural": true,
        "selections": [
          (v1/*: any*/),
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
    "name": "RoutersQuery",
    "selections": (v2/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RoutersQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "RoutersQuery",
    "operationKind": "query",
    "text": "query RoutersQuery(\n  $organization: String!\n) {\n  organization(username: $organization) {\n    id\n    username\n    routers {\n      id\n      label\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '89d807b5ef1eb1a369bf476295ef5b7a';
export default node;
