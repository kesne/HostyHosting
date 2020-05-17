/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type ApplicationInput = {
    name?: string | null;
    description?: string | null;
};
export type CreateApplicationMutationVariables = {
    organization?: string | null;
    application: ApplicationInput;
};
export type CreateApplicationMutationResponse = {
    readonly organization: {
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
};
export type CreateApplicationMutation = {
    readonly response: CreateApplicationMutationResponse;
    readonly variables: CreateApplicationMutationVariables;
};



/*
mutation CreateApplicationMutation(
  $organization: ID
  $application: ApplicationInput!
) {
  organization(id: $organization) {
    createApplication(application: $application) {
      id
      name
      description
      organization {
        id
        username
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
    "name": "organization",
    "type": "ID"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "application",
    "type": "ApplicationInput!"
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
            "name": "application",
            "variableName": "application"
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
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateApplicationMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "CreateApplicationMutation",
    "operationKind": "mutation",
    "text": "mutation CreateApplicationMutation(\n  $organization: ID\n  $application: ApplicationInput!\n) {\n  organization(id: $organization) {\n    createApplication(application: $application) {\n      id\n      name\n      description\n      organization {\n        id\n        username\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '510a80a092bf151021b1d35e35eccabd';
export default node;
