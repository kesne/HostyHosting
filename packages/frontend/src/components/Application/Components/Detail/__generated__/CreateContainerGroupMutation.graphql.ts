/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type ContainerSize = "S16x16" | "S1x1" | "S2x2" | "S4x4" | "S8x8" | "%future added value";
export type CreateContainerGroupInput = {
    componentID: string;
    environmentID: string;
    size: ContainerSize;
    containerCount: number;
};
export type CreateContainerGroupMutationVariables = {
    input: CreateContainerGroupInput;
};
export type CreateContainerGroupMutationResponse = {
    readonly createContainerGroup: {
        readonly id: string;
        readonly monthlyPrice: number;
        readonly containerCount: number;
        readonly size: ContainerSize;
        readonly secrets: ReadonlyArray<{
            readonly id: string;
            readonly key: string;
            readonly value: string;
        }>;
    };
};
export type CreateContainerGroupMutation = {
    readonly response: CreateContainerGroupMutationResponse;
    readonly variables: CreateContainerGroupMutationVariables;
};



/*
mutation CreateContainerGroupMutation(
  $input: CreateContainerGroupInput!
) {
  createContainerGroup(input: $input) {
    id
    monthlyPrice
    containerCount
    size
    secrets {
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
    "name": "input",
    "type": "CreateContainerGroupInput!"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "ContainerGroup",
    "kind": "LinkedField",
    "name": "createContainerGroup",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "monthlyPrice",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "containerCount",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "size",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Secret",
        "kind": "LinkedField",
        "name": "secrets",
        "plural": true,
        "selections": [
          (v1/*: any*/),
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
    "name": "CreateContainerGroupMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateContainerGroupMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "CreateContainerGroupMutation",
    "operationKind": "mutation",
    "text": "mutation CreateContainerGroupMutation(\n  $input: CreateContainerGroupInput!\n) {\n  createContainerGroup(input: $input) {\n    id\n    monthlyPrice\n    containerCount\n    size\n    secrets {\n      id\n      key\n      value\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '1f961b6b4775293dcf087f7cf1ed9317';
export default node;
