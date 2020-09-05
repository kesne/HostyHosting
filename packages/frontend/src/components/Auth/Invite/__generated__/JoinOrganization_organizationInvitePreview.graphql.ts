/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type OrganizationPermission = "ADMIN" | "READ" | "WRITE" | "%future added value";
export type JoinOrganization_organizationInvitePreview = {
    readonly permission: OrganizationPermission;
    readonly " $refType": "JoinOrganization_organizationInvitePreview";
};
export type JoinOrganization_organizationInvitePreview$data = JoinOrganization_organizationInvitePreview;
export type JoinOrganization_organizationInvitePreview$key = {
    readonly " $data"?: JoinOrganization_organizationInvitePreview$data;
    readonly " $fragmentRefs": FragmentRefs<"JoinOrganization_organizationInvitePreview">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "JoinOrganization_organizationInvitePreview",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "permission",
      "storageKey": null
    }
  ],
  "type": "OrganizationInvitePreview",
  "abstractKey": null
};
(node as any).hash = '7331d565326ab30a43737f3d59af1f29';
export default node;
