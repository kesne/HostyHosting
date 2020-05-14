/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type CreateEnvironmentMutationVariables = {
    organization?: string | null;
    name: string;
    label: string;
};
export type CreateEnvironmentMutationResponse = {
    readonly organization: {
        readonly createEnvironment: {
            readonly id: string;
            readonly name: string;
            readonly label: string;
        };
    };
};
export type CreateEnvironmentMutation = {
    readonly response: CreateEnvironmentMutationResponse;
    readonly variables: CreateEnvironmentMutationVariables;
};



/*
mutation CreateEnvironmentMutation(
  $organization: ID
  $name: String!
  $label: String!
) {
  organization(id: $organization) {
    createEnvironment(name: $name, label: $label) {
      id
      name
      label
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "organization",
    "type": "ID"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "name",
    "type": "String!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "label",
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
        "variableName": "organization"
      }
    ],
    "concreteType": "OrganizationMutations",
    "kind": "LinkedField",
    "name": "organization",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "label",
            "variableName": "label"
          },
          {
            "kind": "Variable",
            "name": "name",
            "variableName": "name"
          }
        ],
        "concreteType": "Environment",
        "kind": "LinkedField",
        "name": "createEnvironment",
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
            "name": "name",
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
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateEnvironmentMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateEnvironmentMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "CreateEnvironmentMutation",
    "operationKind": "mutation",
    "text": "mutation CreateEnvironmentMutation(\n  $organization: ID\n  $name: String!\n  $label: String!\n) {\n  organization(id: $organization) {\n    createEnvironment(name: $name, label: $label) {\n      id\n      name\n      label\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '87bb86c7a7bf18d21934e4eb719f8384';
export default node;
