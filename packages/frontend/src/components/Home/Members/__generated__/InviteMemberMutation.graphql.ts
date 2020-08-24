/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type OrganizationPermission = "ADMIN" | "READ" | "WRITE" | "%future added value";
export type InviteToOrganizationInput = {
    organizationID: string;
    name: string;
    email: string;
    permission: OrganizationPermission;
};
export type InviteMemberMutationVariables = {
    input: InviteToOrganizationInput;
};
export type InviteMemberMutationResponse = {
    readonly inviteToOrganization: {
        readonly id: string;
    };
};
export type InviteMemberMutation = {
    readonly response: InviteMemberMutationResponse;
    readonly variables: InviteMemberMutationVariables;
};



/*
mutation InviteMemberMutation(
  $input: InviteToOrganizationInput!
) {
  inviteToOrganization(input: $input) {
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
    "concreteType": "OrganizationMembership",
    "kind": "LinkedField",
    "name": "inviteToOrganization",
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
    "name": "InviteMemberMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "InviteMemberMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4a86db8a5d34209d690cb8f307ac9177",
    "id": null,
    "metadata": {},
    "name": "InviteMemberMutation",
    "operationKind": "mutation",
    "text": "mutation InviteMemberMutation(\n  $input: InviteToOrganizationInput!\n) {\n  inviteToOrganization(input: $input) {\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'd483bedbd850112971601419784cf1d4';
export default node;
