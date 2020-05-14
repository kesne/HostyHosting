/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Environments_organization = {
    readonly id: string;
    readonly environments: ReadonlyArray<{
        readonly id: string;
        readonly name: string;
        readonly label: string;
    }>;
    readonly " $refType": "Environments_organization";
};
export type Environments_organization$data = Environments_organization;
export type Environments_organization$key = {
    readonly " $data"?: Environments_organization$data;
    readonly " $fragmentRefs": FragmentRefs<"Environments_organization">;
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
  "name": "Environments_organization",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Environment",
      "kind": "LinkedField",
      "name": "environments",
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
          "name": "label",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Organization"
};
})();
(node as any).hash = 'e0a4dd84a4a5e8eceda7eb230890ed66';
export default node;
