/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UserComponent_user = {
    readonly name: string;
    readonly " $refType": "UserComponent_user";
};
export type UserComponent_user$data = UserComponent_user;
export type UserComponent_user$key = {
    readonly " $data"?: UserComponent_user$data;
    readonly " $fragmentRefs": FragmentRefs<"UserComponent_user">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserComponent_user",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "User"
};
(node as any).hash = '17634a4bf39242530775953e424d103b';
export default node;
