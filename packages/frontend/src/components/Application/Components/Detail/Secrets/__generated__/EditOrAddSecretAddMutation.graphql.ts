/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type EditOrAddSecretAddMutationVariables = {
    application: string;
    containerGroup: string;
    key: string;
    value: string;
};
export type EditOrAddSecretAddMutationResponse = {
    readonly application: {
        readonly addSecret: {
            readonly id: string;
            readonly key: string;
            readonly value: string;
        };
    };
};
export type EditOrAddSecretAddMutation = {
    readonly response: EditOrAddSecretAddMutationResponse;
    readonly variables: EditOrAddSecretAddMutationVariables;
};



/*
mutation EditOrAddSecretAddMutation(
  $application: ID!
  $containerGroup: ID!
  $key: String!
  $value: String!
) {
  application(id: $application) {
    addSecret(containerGroup: $containerGroup, key: $key, value: $value) {
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
        "name": "addSecret",
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
    "name": "EditOrAddSecretAddMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditOrAddSecretAddMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "EditOrAddSecretAddMutation",
    "operationKind": "mutation",
    "text": "mutation EditOrAddSecretAddMutation(\n  $application: ID!\n  $containerGroup: ID!\n  $key: String!\n  $value: String!\n) {\n  application(id: $application) {\n    addSecret(containerGroup: $containerGroup, key: $key, value: $value) {\n      id\n      key\n      value\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'e680d27f2ac9f35ef05120a95fb7320f';
export default node;
