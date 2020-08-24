/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Delete_application = {
    readonly id: string;
    readonly name: string;
    readonly " $refType": "Delete_application";
};
export type Delete_application$data = Delete_application;
export type Delete_application$key = {
    readonly " $data"?: Delete_application$data;
    readonly " $fragmentRefs": FragmentRefs<"Delete_application">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Delete_application",
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
  "type": "Application",
  "abstractKey": null
};
(node as any).hash = '9cfddcaaaddd79037a2dcfcf61006f21';
export default node;
