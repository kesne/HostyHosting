/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type CreateRouterInput = {
    organizationID: string;
    label: string;
};
export type CreateRouterMutationVariables = {
    input: CreateRouterInput;
};
export type CreateRouterMutationResponse = {
    readonly createRouter: {
        readonly id: string;
        readonly label: string;
    };
};
export type CreateRouterMutation = {
    readonly response: CreateRouterMutationResponse;
    readonly variables: CreateRouterMutationVariables;
};



/*
mutation CreateRouterMutation(
  $input: CreateRouterInput!
) {
  createRouter(input: $input) {
    id
    label
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input",
    "type": "CreateRouterInput!"
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
    "concreteType": "Router",
    "kind": "LinkedField",
    "name": "createRouter",
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
        "name": "label",
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
    "name": "CreateRouterMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateRouterMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "CreateRouterMutation",
    "operationKind": "mutation",
    "text": "mutation CreateRouterMutation(\n  $input: CreateRouterInput!\n) {\n  createRouter(input: $input) {\n    id\n    label\n  }\n}\n"
  }
};
})();
(node as any).hash = '092c2c72df0230b04bebc0697fc99c76';
export default node;
