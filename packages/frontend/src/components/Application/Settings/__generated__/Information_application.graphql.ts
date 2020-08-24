/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Information_application = {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly " $refType": "Information_application";
};
export type Information_application$data = Information_application;
export type Information_application$key = {
    readonly " $data"?: Information_application$data;
    readonly " $fragmentRefs": FragmentRefs<"Information_application">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Information_application",
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    }
  ],
  "type": "Application",
  "abstractKey": null
};
(node as any).hash = 'f75033ff2694ef0cfecf78c421fbbc3e';
export default node;
