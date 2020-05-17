/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type DeleteApplicationMutationVariables = {
    application: string;
};
export type DeleteApplicationMutationResponse = {
    readonly application: {
        readonly delete: {
            readonly id: string;
        };
    };
};
export type DeleteApplicationMutation = {
    readonly response: DeleteApplicationMutationResponse;
    readonly variables: DeleteApplicationMutationVariables;
};



/*
mutation DeleteApplicationMutation(
  $application: ID!
) {
  application(id: $application) {
    delete {
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
        "args": null,
        "concreteType": "Application",
        "kind": "LinkedField",
        "name": "delete",
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
    "name": "DeleteApplicationMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DeleteApplicationMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "DeleteApplicationMutation",
    "operationKind": "mutation",
    "text": "mutation DeleteApplicationMutation(\n  $application: ID!\n) {\n  application(id: $application) {\n    delete {\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '0078f882020e8a6a351c8231406a5311';
export default node;
