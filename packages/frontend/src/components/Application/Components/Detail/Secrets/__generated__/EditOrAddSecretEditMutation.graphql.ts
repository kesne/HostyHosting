/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type EditOrAddSecretEditMutationVariables = {
    application: string;
    containerGroup: string;
    secret: string;
    key: string;
    value: string;
};
export type EditOrAddSecretEditMutationResponse = {
    readonly application: {
        readonly editSecret: {
            readonly id: string;
            readonly key: string;
            readonly value: string;
        };
    };
};
export type EditOrAddSecretEditMutation = {
    readonly response: EditOrAddSecretEditMutationResponse;
    readonly variables: EditOrAddSecretEditMutationVariables;
};



/*
mutation EditOrAddSecretEditMutation(
  $application: ID!
  $containerGroup: ID!
  $secret: ID!
  $key: String!
  $value: String!
) {
  application(id: $application) {
    editSecret(containerGroup: $containerGroup, id: $secret, key: $key, value: $value) {
      id
      key
      value
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "application",
    "type": "ID!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "containerGroup",
    "type": "ID!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "secret",
    "type": "ID!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "key",
    "type": "String!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "value",
    "type": "String!"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "application"
      }
    ],
    "concreteType": "ApplicationMutations",
    "kind": "LinkedField",
    "name": "application",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "containerGroup",
            "variableName": "containerGroup"
          },
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "secret"
          },
          {
            "kind": "Variable",
            "name": "key",
            "variableName": "key"
          },
          {
            "kind": "Variable",
            "name": "value",
            "variableName": "value"
          }
        ],
        "concreteType": "Secret",
        "kind": "LinkedField",
        "name": "editSecret",
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
            "name": "key",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "value",
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
    "name": "EditOrAddSecretEditMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditOrAddSecretEditMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "EditOrAddSecretEditMutation",
    "operationKind": "mutation",
    "text": "mutation EditOrAddSecretEditMutation(\n  $application: ID!\n  $containerGroup: ID!\n  $secret: ID!\n  $key: String!\n  $value: String!\n) {\n  application(id: $application) {\n    editSecret(containerGroup: $containerGroup, id: $secret, key: $key, value: $value) {\n      id\n      key\n      value\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '1cbe331c950a0eb2c2f50bdd3d1a967d';
export default node;
