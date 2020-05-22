/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type IndexRedirectQueryVariables = {};
export type IndexRedirectQueryResponse = {
    readonly viewer: {
        readonly id: string;
        readonly username: string;
    };
};
export type IndexRedirectQuery = {
    readonly response: IndexRedirectQueryResponse;
    readonly variables: IndexRedirectQueryVariables;
};



/*
query IndexRedirectQuery {
  viewer {
    id
    username
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
    "name": "IndexRedirectQuery",
    "selections": (v0/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "IndexRedirectQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "IndexRedirectQuery",
    "operationKind": "query",
    "text": "query IndexRedirectQuery {\n  viewer {\n    id\n    username\n  }\n}\n"
  }
};
})();
(node as any).hash = '6a6efc85175d2e8e1e0bbd3db0e70913';
export default node;
