/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type DeleteSecretInput = {
    secretID: string;
};
export type SecretDeleteMutationVariables = {
    input: DeleteSecretInput;
};
export type SecretDeleteMutationResponse = {
    readonly deleteSecret: {
        readonly id: string;
    };
};
export type SecretDeleteMutation = {
    readonly response: SecretDeleteMutationResponse;
    readonly variables: SecretDeleteMutationVariables;
};



/*
mutation SecretDeleteMutation(
  $input: DeleteSecretInput!
) {
  deleteSecret(input: $input) {
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SecretDeleteMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SecretDeleteMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "757807b23ed3b1fe478da09ae834d3df",
    "id": null,
    "metadata": {},
    "name": "SecretDeleteMutation",
    "operationKind": "mutation",
    "text": "mutation SecretDeleteMutation(\n  $input: DeleteSecretInput!\n) {\n  deleteSecret(input: $input) {\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'd073228e68015d40c9c5a587df05a2f6';
export default node;
