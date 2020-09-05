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
        readonly ok: boolean;
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
    ok
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
    "concreteType": "Result",
    "kind": "LinkedField",
    "name": "inviteToOrganization",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "ok",
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
    "cacheID": "f1bc5cee86d7529a61cdb39a614c7770",
    "id": null,
    "metadata": {},
    "name": "InviteMemberMutation",
    "operationKind": "mutation",
    "text": "mutation InviteMemberMutation(\n  $input: InviteToOrganizationInput!\n) {\n  inviteToOrganization(input: $input) {\n    ok\n  }\n}\n"
  }
};
})();
(node as any).hash = 'a2df49d1c5cc49b3a70c35089d642804';
export default node;
