/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Secrets_containerGroup = {
    readonly id: string;
    readonly secrets: {
        readonly pageInfo: {
            readonly hasNextPage: boolean;
            readonly hasPreviousPage: boolean;
        };
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly " $fragmentRefs": FragmentRefs<"Secret_secret">;
            };
        }>;
    };
    readonly " $refType": "Secrets_containerGroup";
};
export type Secrets_containerGroup$data = Secrets_containerGroup;
export type Secrets_containerGroup$key = {
    readonly " $data"?: Secrets_containerGroup$data;
    readonly " $fragmentRefs": FragmentRefs<"Secrets_containerGroup">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": 10,
      "kind": "LocalArgument",
      "name": "limit",
      "type": "Int"
    },
    {
      "defaultValue": 0,
      "kind": "LocalArgument",
      "name": "offset",
      "type": "Int"
    }
  ],
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
      "args": [
        {
          "kind": "Variable",
          "name": "limit",
          "variableName": "limit"
        },
        {
          "kind": "Variable",
          "name": "offset",
          "variableName": "offset"
        }
      ],
      "concreteType": "SecretConnection",
      "kind": "LinkedField",
      "name": "secrets",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "PageInfo",
          "kind": "LinkedField",
          "name": "pageInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasNextPage",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasPreviousPage",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "SecretEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Secret",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
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
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ContainerGroup"
};
(node as any).hash = '041ade75df02de7b0c0be9e12419fa8d';
export default node;
