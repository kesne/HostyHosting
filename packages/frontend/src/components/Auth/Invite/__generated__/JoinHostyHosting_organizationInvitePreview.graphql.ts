/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type JoinHostyHosting_organizationInvitePreview = {
    readonly name: string;
    readonly email: string;
    readonly " $refType": "JoinHostyHosting_organizationInvitePreview";
};
export type JoinHostyHosting_organizationInvitePreview$data = JoinHostyHosting_organizationInvitePreview;
export type JoinHostyHosting_organizationInvitePreview$key = {
    readonly " $data"?: JoinHostyHosting_organizationInvitePreview$data;
    readonly " $fragmentRefs": FragmentRefs<"JoinHostyHosting_organizationInvitePreview">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "JoinHostyHosting_organizationInvitePreview",
  "selections": [
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
      "name": "email",
      "storageKey": null
    }
  ],
  "type": "OrganizationInvitePreview",
  "abstractKey": null
};
(node as any).hash = '34f507944b66d9c3238ef1576098fe36';
export default node;
