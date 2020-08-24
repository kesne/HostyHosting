/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Secret_secret = {
    readonly id: string;
    readonly key: string;
    readonly value: string;
    readonly " $refType": "Secret_secret";
};
export type Secret_secret$data = Secret_secret;
export type Secret_secret$key = {
    readonly " $data"?: Secret_secret$data;
    readonly " $fragmentRefs": FragmentRefs<"Secret_secret">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Secret_secret",
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
      "name": "key",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "value",
      "storageKey": null
    }
  ],
  "type": "Secret",
  "abstractKey": null
};
(node as any).hash = '5b70825bf91f8d7c68ef9a02d53fdc84';
export default node;
