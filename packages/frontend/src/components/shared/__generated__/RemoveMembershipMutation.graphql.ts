/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type DeleteOrganizationMembershipInput = {
    id: string;
};
export type RemoveMembershipMutationVariables = {
    input: DeleteOrganizationMembershipInput;
};
export type RemoveMembershipMutationResponse = {
    readonly deleteOrganizationMembership: {
        readonly id: string | null;
    };
};
export type RemoveMembershipMutation = {
    readonly response: RemoveMembershipMutationResponse;
    readonly variables: RemoveMembershipMutationVariables;
};



/*
mutation RemoveMembershipMutation(
  $input: DeleteOrganizationMembershipInput!
) {
  deleteOrganizationMembership(input: $input) {
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
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
    "name": "RemoveMembershipMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "TODORemoveOnceRelayUpdatesToSupportRequiredIDReturns",
        "kind": "LinkedField",
        "name": "deleteOrganizationMembership",
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
    "name": "RemoveMembershipMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "TODORemoveOnceRelayUpdatesToSupportRequiredIDReturns",
        "kind": "LinkedField",
        "name": "deleteOrganizationMembership",
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
    "cacheID": "fa16c082bf5bb5f0286d545049a63e8b",
    "id": null,
    "metadata": {},
    "name": "RemoveMembershipMutation",
    "operationKind": "mutation",
    "text": "mutation RemoveMembershipMutation(\n  $input: DeleteOrganizationMembershipInput!\n) {\n  deleteOrganizationMembership(input: $input) {\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '55e265003c46f64fcde8289339f2254f';
export default node;
