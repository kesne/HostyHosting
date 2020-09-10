/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type OrganizationPermission = "ADMIN" | "READ" | "WRITE" | "%future added value";
export type InvitedMember_OrganizationInvite = {
    readonly id: string;
    readonly name: string;
    readonly permission: OrganizationPermission;
    readonly email: string;
    readonly " $refType": "InvitedMember_OrganizationInvite";
};
export type InvitedMember_OrganizationInvite$data = InvitedMember_OrganizationInvite;
export type InvitedMember_OrganizationInvite$key = {
    readonly " $data"?: InvitedMember_OrganizationInvite$data;
    readonly " $fragmentRefs": FragmentRefs<"InvitedMember_OrganizationInvite">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "InvitedMember_OrganizationInvite",
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
      "name": "permission",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "email",
      "storageKey": null
    }
  ],
  "type": "OrganizationInvite",
  "abstractKey": null
};
(node as any).hash = '9039158b8fce2f5254f701b1e3e29118';
export default node;
