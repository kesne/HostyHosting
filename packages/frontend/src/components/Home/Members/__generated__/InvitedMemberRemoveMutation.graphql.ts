/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type InvitedMemberRemoveMutationVariables = {
    id: string;
};
export type InvitedMemberRemoveMutationResponse = {
    readonly removeInvite: {
        readonly id: string | null;
    };
};
export type InvitedMemberRemoveMutation = {
    readonly response: InvitedMemberRemoveMutationResponse;
    readonly variables: InvitedMemberRemoveMutationVariables;
};



/*
mutation InvitedMemberRemoveMutation(
  $id: ID!
) {
  removeInvite(id: $id) {
    id
  }
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
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "InvitedMemberRemoveMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "TODORemoveOnceRelayUpdatesToSupportRequiredIDReturns",
        "kind": "LinkedField",
        "name": "removeInvite",
        "plural": false,
        "selections": [
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "InvitedMemberRemoveMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "TODORemoveOnceRelayUpdatesToSupportRequiredIDReturns",
        "kind": "LinkedField",
        "name": "removeInvite",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "deleteRecord",
            "key": "",
            "kind": "ScalarHandle",
            "name": "id"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "95c83127a60735dd26c08cd0c4b8ad3c",
    "id": null,
    "metadata": {},
    "name": "InvitedMemberRemoveMutation",
    "operationKind": "mutation",
    "text": "mutation InvitedMemberRemoveMutation(\n  $id: ID!\n) {\n  removeInvite(id: $id) {\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '83ae59062df0d4cdae629b9505a04187';
export default node;
