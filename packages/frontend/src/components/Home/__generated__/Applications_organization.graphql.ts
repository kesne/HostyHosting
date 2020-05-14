/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Applications_organization = {
    readonly id: string;
    readonly username: string;
    readonly applications: ReadonlyArray<{
        readonly id: string;
        readonly name: string;
        readonly description: string;
    }>;
    readonly " $refType": "Applications_organization";
};
export type Applications_organization$data = Applications_organization;
export type Applications_organization$key = {
    readonly " $data"?: Applications_organization$data;
    readonly " $fragmentRefs": FragmentRefs<"Applications_organization">;
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
  "name": "Applications_organization",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "username",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Application",
      "kind": "LinkedField",
      "name": "applications",
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
          "name": "description",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Organization"
};
})();
(node as any).hash = '1d8fe44484ef2c860dea45de8e75a4fe';
export default node;
