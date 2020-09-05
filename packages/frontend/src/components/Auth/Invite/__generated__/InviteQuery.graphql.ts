/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type InviteQueryVariables = {
    id: string;
};
export type InviteQueryResponse = {
    readonly organizationInvitePreview: {
        readonly organizationName: string;
        readonly " $fragmentRefs": FragmentRefs<"JoinHostyHosting_organizationInvitePreview" | "JoinOrganization_organizationInvitePreview">;
    };
};
export type InviteQuery = {
    readonly response: InviteQueryResponse;
    readonly variables: InviteQueryVariables;
};



/*
query InviteQuery(
  $id: ID!
) {
  organizationInvitePreview(id: $id) {
    organizationName
    ...JoinHostyHosting_organizationInvitePreview
    ...JoinOrganization_organizationInvitePreview
  }
}

fragment JoinHostyHosting_organizationInvitePreview on OrganizationInvitePreview {
  name
  email
}

fragment JoinOrganization_organizationInvitePreview on OrganizationInvitePreview {
  permission
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "organizationName",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "InviteQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "OrganizationInvitePreview",
        "kind": "LinkedField",
        "name": "organizationInvitePreview",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "JoinHostyHosting_organizationInvitePreview"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "JoinOrganization_organizationInvitePreview"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "InviteQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "OrganizationInvitePreview",
        "kind": "LinkedField",
        "name": "organizationInvitePreview",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
            "name": "email",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "permission",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "7f2caba60118cafa4dea4844893f8993",
    "id": null,
    "metadata": {},
    "name": "InviteQuery",
    "operationKind": "query",
    "text": "query InviteQuery(\n  $id: ID!\n) {\n  organizationInvitePreview(id: $id) {\n    organizationName\n    ...JoinHostyHosting_organizationInvitePreview\n    ...JoinOrganization_organizationInvitePreview\n  }\n}\n\nfragment JoinHostyHosting_organizationInvitePreview on OrganizationInvitePreview {\n  name\n  email\n}\n\nfragment JoinOrganization_organizationInvitePreview on OrganizationInvitePreview {\n  permission\n}\n"
  }
};
})();
(node as any).hash = '9b1eb3d23e55d25f4084ba2e2d71d78b';
export default node;
