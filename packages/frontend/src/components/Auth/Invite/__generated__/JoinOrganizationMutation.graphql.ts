/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type JoinOrganizationMutationVariables = {
    id: string;
};
export type JoinOrganizationMutationResponse = {
    readonly acceptInvite: {
        readonly id: string;
        readonly username: string;
    };
};
export type JoinOrganizationMutation = {
    readonly response: JoinOrganizationMutationResponse;
    readonly variables: JoinOrganizationMutationVariables;
};



/*
mutation JoinOrganizationMutation(
  $id: ID!
) {
  acceptInvite(id: $id) {
    id
    username
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
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
    "concreteType": "Organization",
    "kind": "LinkedField",
    "name": "acceptInvite",
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
        "name": "username",
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
    "name": "JoinOrganizationMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "JoinOrganizationMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f6e54a1f21eabb6ccad036ae6e730e2a",
    "id": null,
    "metadata": {},
    "name": "JoinOrganizationMutation",
    "operationKind": "mutation",
    "text": "mutation JoinOrganizationMutation(\n  $id: ID!\n) {\n  acceptInvite(id: $id) {\n    id\n    username\n  }\n}\n"
  }
};
})();
(node as any).hash = 'b937a7f8fb448ee66de064f579ca5034';
export default node;
