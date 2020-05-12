/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type UserNavQueryVariables = {};
export type UserNavQueryResponse = {
    readonly me: {
        readonly id: string;
        readonly username: string;
        readonly name: string;
        readonly email: string;
        readonly hasTOTP: boolean;
    };
};
export type UserNavQuery = {
    readonly response: UserNavQueryResponse;
    readonly variables: UserNavQueryVariables;
};



/*
query UserNavQuery {
  me {
    id
    username
    name
    email
    hasTOTP
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "hasTOTP",
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
    "name": "UserNavQuery",
    "selections": (v0/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "UserNavQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "UserNavQuery",
    "operationKind": "query",
    "text": "query UserNavQuery {\n  me {\n    id\n    username\n    name\n    email\n    hasTOTP\n  }\n}\n"
  }
};
})();
(node as any).hash = '9a471102284f99baff5bf3416b87bd15';
export default node;
