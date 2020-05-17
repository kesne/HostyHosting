/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type SecurityQueryVariables = {};
export type SecurityQueryResponse = {
    readonly me: {
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
  me {
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
    "text": "query SecurityQuery {\n  me {\n    id\n    hasTOTP\n  }\n}\n"
  }
};
})();
(node as any).hash = '394b1543d7fe8d64ad4f3e39fdb7c11e';
export default node;
