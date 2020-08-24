/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type DeleteApplicationInput = {
    applicationID: string;
};
export type DeleteApplicationMutationVariables = {
    input: DeleteApplicationInput;
};
export type DeleteApplicationMutationResponse = {
    readonly deleteApplication: {
        readonly id: string;
    };
};
export type DeleteApplicationMutation = {
    readonly response: DeleteApplicationMutationResponse;
    readonly variables: DeleteApplicationMutationVariables;
};



/*
mutation DeleteApplicationMutation(
  $input: DeleteApplicationInput!
) {
  deleteApplication(input: $input) {
    id
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
    "name": "deleteApplication",
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
    "name": "DeleteApplicationMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DeleteApplicationMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "55bd0ba522c0d9c676aceb8f781d2009",
    "id": null,
    "metadata": {},
    "name": "DeleteApplicationMutation",
    "operationKind": "mutation",
    "text": "mutation DeleteApplicationMutation(\n  $input: DeleteApplicationInput!\n) {\n  deleteApplication(input: $input) {\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'd7cc00ecdeade9525450f8362175df4a';
export default node;
