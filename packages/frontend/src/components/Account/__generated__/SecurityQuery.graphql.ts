/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type SecurityQueryVariables = {};
export type SecurityQueryResponse = {
    readonly viewer: {
        readonly id: string;
        readonly hasTOTP: boolean;
    };
};
export type SecurityQuery = {
    readonly response: SecurityQueryResponse;
    readonly variables: SecurityQueryVariables;
};



/*
query SecurityQuery {
  viewer {
    id
    hasTOTP
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
    "name": "SecurityQuery",
    "selections": (v0/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SecurityQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "SecurityQuery",
    "operationKind": "query",
    "text": "query SecurityQuery {\n  viewer {\n    id\n    hasTOTP\n  }\n}\n"
  }
};
})();
(node as any).hash = '48aab241138f64d25ed5319bfe8f00e1';
export default node;
