/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type EditAccountQueryVariables = {};
export type EditAccountQueryResponse = {
    readonly me: {
        readonly id: string;
        readonly username: string;
        readonly name: string;
        readonly email: string;
    };
};
export type EditAccountQuery = {
    readonly response: EditAccountQueryResponse;
    readonly variables: EditAccountQueryVariables;
};



/*
query EditAccountQuery {
  me {
    id
    username
    name
    email
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "CurrentUser",
    "kind": "LinkedField",
    "name": "me",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
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
        "kind": "ScalarField",
        "name": "name",
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
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "EditAccountQuery",
    "selections": (v0/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "EditAccountQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "EditAccountQuery",
    "operationKind": "query",
    "text": "query EditAccountQuery {\n  me {\n    id\n    username\n    name\n    email\n  }\n}\n"
  }
};
})();
(node as any).hash = '2d4fee9cb63487d3ea742051049d4cdc';
export default node;
