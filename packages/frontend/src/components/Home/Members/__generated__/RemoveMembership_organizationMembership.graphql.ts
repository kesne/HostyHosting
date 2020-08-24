/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type RemoveMembership_organizationMembership = {
    readonly id: string;
    readonly user: {
        readonly id: string;
        readonly name: string;
    };
    readonly " $refType": "RemoveMembership_organizationMembership";
};
export type RemoveMembership_organizationMembership$data = RemoveMembership_organizationMembership;
export type RemoveMembership_organizationMembership$key = {
    readonly " $data"?: RemoveMembership_organizationMembership$data;
    readonly " $fragmentRefs": FragmentRefs<"RemoveMembership_organizationMembership">;
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
  "name": "RemoveMembership_organizationMembership",
  "selections": [
    (v0/*: any*/),
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
(node as any).hash = '47dfd286809647063c947e47cf1e553a';
export default node;
