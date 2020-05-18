/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SelectOrganization_viewer = {
    readonly id: string;
    readonly personalOrganization: {
        readonly id: string;
    };
    readonly organizations: ReadonlyArray<{
        readonly id: string;
        readonly name: string;
        readonly username: string;
    }>;
    readonly " $refType": "SelectOrganization_viewer";
};
export type SelectOrganization_viewer$data = SelectOrganization_viewer;
export type SelectOrganization_viewer$key = {
    readonly " $data"?: SelectOrganization_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"SelectOrganization_viewer">;
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
  "name": "SelectOrganization_viewer",
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
  "type": "User"
};
})();
(node as any).hash = '4bc9a28d68b7539ec0d39f3ce4a97012';
export default node;
