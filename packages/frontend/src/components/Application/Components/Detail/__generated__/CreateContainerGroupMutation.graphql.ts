/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
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
        readonly " $fragmentRefs": FragmentRefs<"Secrets_containerGroup">;
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
    ...Secrets_containerGroup
  }
}

fragment Secret_secret on Secret {
  id
  key
  value
}

fragment Secrets_containerGroup on ContainerGroup {
  id
  secrets(limit: 10, offset: 0) {
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
    edges {
      node {
        ...Secret_secret
        id
      }
    }
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
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "monthlyPrice",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "containerCount",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "size",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateContainerGroupMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ContainerGroup",
        "kind": "LinkedField",
        "name": "createContainerGroup",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Secrets_containerGroup"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateContainerGroupMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ContainerGroup",
        "kind": "LinkedField",
        "name": "createContainerGroup",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "limit",
                "value": 10
              },
              {
                "kind": "Literal",
                "name": "offset",
                "value": 0
              }
            ],
            "concreteType": "SecretConnection",
            "kind": "LinkedField",
            "name": "secrets",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "PageInfo",
                "kind": "LinkedField",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasPreviousPage",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "SecretEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Secret",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
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
            ],
            "storageKey": "secrets(limit:10,offset:0)"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "19b12e21407934861261b44aad261eec",
    "id": null,
    "metadata": {},
    "name": "CreateContainerGroupMutation",
    "operationKind": "mutation",
    "text": "mutation CreateContainerGroupMutation(\n  $input: CreateContainerGroupInput!\n) {\n  createContainerGroup(input: $input) {\n    id\n    monthlyPrice\n    containerCount\n    size\n    ...Secrets_containerGroup\n  }\n}\n\nfragment Secret_secret on Secret {\n  id\n  key\n  value\n}\n\nfragment Secrets_containerGroup on ContainerGroup {\n  id\n  secrets(limit: 10, offset: 0) {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n    }\n    edges {\n      node {\n        ...Secret_secret\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '2c6fd5741a3bb8ed19a37a6c939f491d';
export default node;
