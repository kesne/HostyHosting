/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SelectOrganization_me = {
    readonly id: string;
    readonly personalOrganization: {
        readonly id: string;
    };
    readonly organizations: ReadonlyArray<{
        readonly id: string;
        readonly name: string;
        readonly username: string;
    }>;
    readonly " $refType": "SelectOrganization_me";
};
export type SelectOrganization_me$data = SelectOrganization_me;
export type SelectOrganization_me$key = {
    readonly " $data"?: SelectOrganization_me$data;
    readonly " $fragmentRefs": FragmentRefs<"SelectOrganization_me">;
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
  "name": "SelectOrganization_me",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Organization",
      "kind": "LinkedField",
      "name": "personalOrganization",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Organization",
      "kind": "LinkedField",
      "name": "organizations",
      "plural": true,
      "selections": [
        (v0/*: any*/),
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
          "name": "username",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CurrentUser"
};
})();
(node as any).hash = 'c58338a61cb34499336a642f04fe0593';
export default node;
