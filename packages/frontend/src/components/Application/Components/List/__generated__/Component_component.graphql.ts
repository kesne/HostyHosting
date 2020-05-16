/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Component_component = {
    readonly id: string;
    readonly name: string;
    readonly " $refType": "Component_component";
};
export type Component_component$data = Component_component;
export type Component_component$key = {
    readonly " $data"?: Component_component$data;
    readonly " $fragmentRefs": FragmentRefs<"Component_component">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Component_component",
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
    }
  ],
  "type": "Component"
};
(node as any).hash = '7144ba550b97e10007f9460895d9961a';
export default node;
