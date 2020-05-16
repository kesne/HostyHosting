/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type SecretDeleteMutationVariables = {
    application: string;
    containerGroup: string;
    secret: string;
};
export type SecretDeleteMutationResponse = {
    readonly application: {
        readonly deleteSecret: {
            readonly id: string;
        };
    };
};
export type SecretDeleteMutation = {
    readonly response: SecretDeleteMutationResponse;
    readonly variables: SecretDeleteMutationVariables;
};



/*
mutation SecretDeleteMutation(
  $application: ID!
  $containerGroup: ID!
  $secret: ID!
) {
  application(id: $application) {
    deleteSecret(containerGroup: $containerGroup, id: $secret) {
      id
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
          }
        ],
        "concreteType": "Secret",
        "kind": "LinkedField",
        "name": "deleteSecret",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
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
    "name": "SecretDeleteMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SecretDeleteMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "SecretDeleteMutation",
    "operationKind": "mutation",
    "text": "mutation SecretDeleteMutation(\n  $application: ID!\n  $containerGroup: ID!\n  $secret: ID!\n) {\n  application(id: $application) {\n    deleteSecret(containerGroup: $containerGroup, id: $secret) {\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'bd89474d668701761c5330f50bee2ba7';
export default node;
