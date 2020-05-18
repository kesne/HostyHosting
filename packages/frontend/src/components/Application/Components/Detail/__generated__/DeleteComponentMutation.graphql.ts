/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type DeleteComponentInput = {
    componentID: string;
};
export type DeleteComponentMutationVariables = {
    input: DeleteComponentInput;
};
export type DeleteComponentMutationResponse = {
    readonly deleteComponent: {
        readonly id: string;
    };
};
export type DeleteComponentMutation = {
    readonly response: DeleteComponentMutationResponse;
    readonly variables: DeleteComponentMutationVariables;
};



/*
mutation DeleteComponentMutation(
  $input: DeleteComponentInput!
) {
  deleteComponent(input: $input) {
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input",
    "type": "DeleteComponentInput!"
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
    "text": "mutation DeleteComponentMutation(\n  $input: DeleteComponentInput!\n) {\n  deleteComponent(input: $input) {\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'bf0b1b4d0962709d83828b42324e7889';
export default node;
