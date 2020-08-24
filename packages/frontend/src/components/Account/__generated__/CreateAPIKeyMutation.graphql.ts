/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type CreateAPIKeyMutationVariables = {
    description: string;
};
export type CreateAPIKeyMutationResponse = {
    readonly createAPIKey: {
        readonly node: {
            readonly id: string;
            readonly description: string;
            readonly createdAt: string;
            readonly privateKey: string | null;
        };
    };
};
export type CreateAPIKeyMutation = {
    readonly response: CreateAPIKeyMutationResponse;
    readonly variables: CreateAPIKeyMutationVariables;
};



/*
mutation CreateAPIKeyMutation(
  $description: String!
) {
  createAPIKey(description: $description) {
    node {
      id
      description
      createdAt
      privateKey
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "description"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "description",
        "variableName": "description"
      }
    ],
    "concreteType": "APIKeyEdge",
    "kind": "LinkedField",
    "name": "createAPIKey",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "APIKey",
        "kind": "LinkedField",
        "name": "node",
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
            "name": "description",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "createdAt",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "privateKey",
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
    "name": "CreateAPIKeyMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateAPIKeyMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "299fad644108535f755f69fc38068e2c",
    "id": null,
    "metadata": {},
    "name": "CreateAPIKeyMutation",
    "operationKind": "mutation",
    "text": "mutation CreateAPIKeyMutation(\n  $description: String!\n) {\n  createAPIKey(description: $description) {\n    node {\n      id\n      description\n      createdAt\n      privateKey\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '45e07dba623a897e6e51519c2abceda6';
export default node;
