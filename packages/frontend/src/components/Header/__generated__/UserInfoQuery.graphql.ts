/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UserInfoQueryVariables = {};
export type UserInfoQueryResponse = {
    readonly viewer: {
        readonly id: string;
        readonly username: string;
        readonly name: string;
        readonly email: string;
    };
};
export type UserInfoQuery = {
    readonly response: UserInfoQueryResponse;
    readonly variables: UserInfoQueryVariables;
};



/*
query UserInfoQuery {
  viewer {
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
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "viewer",
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
    "name": "UserInfoQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "UserInfoQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "fa9a3442eff4936d8cc4be98afcee6ce",
    "id": null,
    "metadata": {},
    "name": "UserInfoQuery",
    "operationKind": "query",
    "text": "query UserInfoQuery {\n  viewer {\n    id\n    username\n    name\n    email\n  }\n}\n"
  }
};
})();
(node as any).hash = '7c71942063706b8296c6c359ff679ef1';
export default node;
