/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UpdateApplicationInput = {
    applicationID: string;
    name?: string | null;
    label?: string | null;
    description?: string | null;
};
export type InformationUpdateMutationVariables = {
    input: UpdateApplicationInput;
};
export type InformationUpdateMutationResponse = {
    readonly updateApplication: {
        readonly id: string;
        readonly name: string;
        readonly description: string;
    };
};
export type InformationUpdateMutation = {
    readonly response: InformationUpdateMutationResponse;
    readonly variables: InformationUpdateMutationVariables;
};



/*
mutation InformationUpdateMutation(
  $input: UpdateApplicationInput!
) {
  updateApplication(input: $input) {
    id
    name
    description
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
    "name": "updateApplication",
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "InformationUpdateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "InformationUpdateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "651749a99b2325e315bb12b1bde2b231",
    "id": null,
    "metadata": {},
    "name": "InformationUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation InformationUpdateMutation(\n  $input: UpdateApplicationInput!\n) {\n  updateApplication(input: $input) {\n    id\n    name\n    description\n  }\n}\n"
  }
};
})();
(node as any).hash = '697402cd20ac9bc10069690a9204791d';
export default node;
