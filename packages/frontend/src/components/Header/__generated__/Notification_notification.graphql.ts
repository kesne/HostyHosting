/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Notification_notification = {
    readonly id: string;
    readonly title: string;
    readonly body: string;
    readonly createdAt: string;
    readonly " $refType": "Notification_notification";
};
export type Notification_notification$data = Notification_notification;
export type Notification_notification$key = {
    readonly " $data"?: Notification_notification$data;
    readonly " $fragmentRefs": FragmentRefs<"Notification_notification">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Notification_notification",
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
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "body",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "createdAt",
      "storageKey": null
    }
  ],
  "type": "Notification",
  "abstractKey": null
};
(node as any).hash = '90e56b1f1724ba0981b8288bf8ff22a8';
export default node;
