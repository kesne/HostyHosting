/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type APIKeysQueryVariables = {};
export type APIKeysQueryResponse = {
    readonly apiKeys: ReadonlyArray<{
        readonly id: string;
        readonly description: string;
        readonly createdAt: unknown;
    }>;
};
export type APIKeysQuery = {
    readonly response: APIKeysQueryResponse;
    readonly variables: APIKeysQueryVariables;
};



/*
query APIKeysQuery {
  apiKeys {
    id
    description
    createdAt
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "APIKey",
    "kind": "LinkedField",
    "name": "apiKeys",
    "plural": true,
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
        "name": "description",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "createdAt",
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
    "name": "APIKeysQuery",
    "selections": (v0/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "APIKeysQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "APIKeysQuery",
    "operationKind": "query",
    "text": "query APIKeysQuery {\n  apiKeys {\n    id\n    description\n    createdAt\n  }\n}\n"
  }
};
})();
(node as any).hash = '4ba8d352980ff3484164e9cbe7b10502';
export default node;
