/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type CreateApplicationInput = {
    organizationID: string;
    name: string;
    label: string;
    description?: string | null;
};
export type CreateApplicationMutationVariables = {
    input: CreateApplicationInput;
};
export type CreateApplicationMutationResponse = {
    readonly createApplication: {
        readonly id: string;
        readonly name: string;
        readonly description: string;
        readonly organization: {
            readonly id: string;
            readonly username: string;
        };
    };
};
export type CreateApplicationMutation = {
    readonly response: CreateApplicationMutationResponse;
    readonly variables: CreateApplicationMutationVariables;
};



/*
mutation CreateApplicationMutation(
  $input: CreateApplicationInput!
) {
  createApplication(input: $input) {
    id
    name
    description
    organization {
      id
      username
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
    "concreteType": "Application",
    "kind": "LinkedField",
    "name": "createApplication",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "description",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Organization",
        "kind": "LinkedField",
        "name": "organization",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "username",
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
    "name": "CreateApplicationMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateApplicationMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "3eec78a1d3963a592dc4eef000ecb0da",
    "id": null,
    "metadata": {},
    "name": "CreateApplicationMutation",
    "operationKind": "mutation",
    "text": "mutation CreateApplicationMutation(\n  $input: CreateApplicationInput!\n) {\n  createApplication(input: $input) {\n    id\n    name\n    description\n    organization {\n      id\n      username\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '7d687723f5070ec5ec4e50ba83b0bf33';
export default node;
