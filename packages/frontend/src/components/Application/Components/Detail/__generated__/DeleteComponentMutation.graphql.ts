/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type DeleteComponentMutationVariables = {
    application: string;
    id: string;
};
export type DeleteComponentMutationResponse = {
    readonly application: {
        readonly deleteComponent: {
            readonly id: string;
        };
    };
};
export type DeleteComponentMutation = {
    readonly response: DeleteComponentMutationResponse;
    readonly variables: DeleteComponentMutationVariables;
};



/*
mutation DeleteComponentMutation(
  $application: ID!
  $id: ID!
) {
  application(id: $application) {
    deleteComponent(id: $id) {
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
    "name": "id",
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
            "name": "id",
            "variableName": "id"
          }
        ],
        "concreteType": "Component",
        "kind": "LinkedField",
        "name": "deleteComponent",
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
    "name": "DeleteComponentMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DeleteComponentMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "DeleteComponentMutation",
    "operationKind": "mutation",
    "text": "mutation DeleteComponentMutation(\n  $application: ID!\n  $id: ID!\n) {\n  application(id: $application) {\n    deleteComponent(id: $id) {\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'a229582772cf12eb4a2bd91bcc05c690';
export default node;
