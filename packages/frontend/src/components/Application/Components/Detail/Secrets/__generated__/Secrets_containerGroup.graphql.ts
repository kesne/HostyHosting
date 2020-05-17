/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Secrets_containerGroup = {
    readonly id: string;
    readonly secrets: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"Secret_secret">;
    }>;
    readonly " $refType": "Secrets_containerGroup";
};
export type Secrets_containerGroup$data = Secrets_containerGroup;
export type Secrets_containerGroup$key = {
    readonly " $data"?: Secrets_containerGroup$data;
    readonly " $fragmentRefs": FragmentRefs<"Secrets_containerGroup">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Secrets_containerGroup",
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
      "concreteType": "Secret",
      "kind": "LinkedField",
      "name": "secrets",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "Secret_secret"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ContainerGroup"
};
(node as any).hash = '8e545ca76e5ac625e93ae3f839f979d8';
export default node;
