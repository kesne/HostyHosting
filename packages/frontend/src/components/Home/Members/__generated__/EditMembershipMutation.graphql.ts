/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type OrganizationPermission = "ADMIN" | "READ" | "WRITE" | "%future added value";
export type UpdateOrganizationMembershipInput = {
    id: string;
    permission: OrganizationPermission;
};
export type EditMembershipMutationVariables = {
    input: UpdateOrganizationMembershipInput;
};
export type EditMembershipMutationResponse = {
    readonly updateOrganizationMembership: {
        readonly id: string;
        readonly permission: OrganizationPermission;
    };
};
export type EditMembershipMutation = {
    readonly response: EditMembershipMutationResponse;
    readonly variables: EditMembershipMutationVariables;
};



/*
mutation EditMembershipMutation(
  $input: UpdateOrganizationMembershipInput!
) {
  updateOrganizationMembership(input: $input) {
    id
    permission
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
    "concreteType": "OrganizationMembership",
    "kind": "LinkedField",
    "name": "updateOrganizationMembership",
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
        "name": "permission",
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
    "name": "EditMembershipMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditMembershipMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "b0a0d130f88521c8087a15966b9ad82f",
    "id": null,
    "metadata": {},
    "name": "EditMembershipMutation",
    "operationKind": "mutation",
    "text": "mutation EditMembershipMutation(\n  $input: UpdateOrganizationMembershipInput!\n) {\n  updateOrganizationMembership(input: $input) {\n    id\n    permission\n  }\n}\n"
  }
};
})();
(node as any).hash = 'ddd0294b6945cbb0909f0ea802977d3f';
export default node;
