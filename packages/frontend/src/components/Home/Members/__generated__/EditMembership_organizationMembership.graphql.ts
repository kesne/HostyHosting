/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type OrganizationPermission = "ADMIN" | "READ" | "WRITE" | "%future added value";
export type EditMembership_organizationMembership = {
    readonly id: string;
    readonly permission: OrganizationPermission;
    readonly user: {
        readonly id: string;
        readonly name: string;
    };
    readonly " $refType": "EditMembership_organizationMembership";
};
export type EditMembership_organizationMembership$data = EditMembership_organizationMembership;
export type EditMembership_organizationMembership$key = {
    readonly " $data"?: EditMembership_organizationMembership$data;
    readonly " $fragmentRefs": FragmentRefs<"EditMembership_organizationMembership">;
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
  "name": "EditMembership_organizationMembership",
  "selections": [
    (v0/*: any*/),
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
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "user",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "OrganizationMembership",
  "abstractKey": null
};
})();
(node as any).hash = '6ae7d76229ef48359f7cdc87b95367b4';
export default node;
