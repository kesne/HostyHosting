/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type PreviewQueryVariables = {
    component: string;
    environment: string;
};
export type PreviewQueryResponse = {
    readonly component: {
        readonly containerGroup: {
            readonly id: string;
            readonly dnsName: string;
        } | null;
    };
};
export type PreviewQuery = {
    readonly response: PreviewQueryResponse;
    readonly variables: PreviewQueryVariables;
};



/*
query PreviewQuery(
  $component: ID!
  $environment: ID!
) {
  component(id: $component) {
    containerGroup(environment: $environment) {
      id
      dnsName
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "component",
    "type": "ID!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "environment",
    "type": "ID!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "component"
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
  "args": [
    {
      "kind": "Variable",
      "name": "environment",
      "variableName": "environment"
    }
  ],
  "concreteType": "ContainerGroup",
  "kind": "LinkedField",
  "name": "containerGroup",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "dnsName",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PreviewQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Component",
        "kind": "LinkedField",
        "name": "component",
        "plural": false,
        "selections": [
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PreviewQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Component",
        "kind": "LinkedField",
        "name": "component",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "PreviewQuery",
    "operationKind": "query",
    "text": "query PreviewQuery(\n  $component: ID!\n  $environment: ID!\n) {\n  component(id: $component) {\n    containerGroup(environment: $environment) {\n      id\n      dnsName\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '5a25f3f26977b20cffd9b716b0bf5572';
export default node;
