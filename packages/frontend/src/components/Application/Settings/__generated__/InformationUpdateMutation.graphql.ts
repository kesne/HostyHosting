/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type ApplicationInput = {
    name?: string | null;
    description?: string | null;
};
export type InformationUpdateMutationVariables = {
    id: string;
    application: ApplicationInput;
};
export type InformationUpdateMutationResponse = {
    readonly application: {
        readonly update: {
            readonly id: string;
            readonly name: string;
            readonly description: string;
        };
    };
};
export type InformationUpdateMutation = {
    readonly response: InformationUpdateMutationResponse;
    readonly variables: InformationUpdateMutationVariables;
};



/*
mutation InformationUpdateMutation(
  $id: ID!
  $application: ApplicationInput!
) {
  application(id: $id) {
    update(application: $application) {
      id
      name
      description
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id",
    "type": "ID!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "application",
    "type": "ApplicationInput!"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
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
            "name": "application",
            "variableName": "application"
          }
        ],
        "concreteType": "Application",
        "kind": "LinkedField",
        "name": "update",
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
            "name": "description",
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
    "name": "InformationUpdateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "InformationUpdateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "InformationUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation InformationUpdateMutation(\n  $id: ID!\n  $application: ApplicationInput!\n) {\n  application(id: $id) {\n    update(application: $application) {\n      id\n      name\n      description\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '22da4165bec5d43538906d97c0819c5f';
export default node;
