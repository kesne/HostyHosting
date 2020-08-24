/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type OrganizationPermission = "ADMIN" | "READ" | "WRITE" | "%future added value";
export type InviteMember_organization = {
    readonly id: string;
    readonly membership: {
        readonly id: string;
        readonly permission: OrganizationPermission;
    };
    readonly " $refType": "InviteMember_organization";
};
export type InviteMember_organization$data = InviteMember_organization;
export type InviteMember_organization$key = {
    readonly " $data"?: InviteMember_organization$data;
    readonly " $fragmentRefs": FragmentRefs<"InviteMember_organization">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "InviteMember_organization",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "OrganizationMembership",
      "kind": "LinkedField",
      "name": "membership",
      "plural": false,
      "selections": [
        (v0/*: any*/),
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
  ],
  "type": "Organization",
  "abstractKey": null
};
})();
(node as any).hash = '5f8b391e489bc8fba75d1b02358ec590';
export default node;
