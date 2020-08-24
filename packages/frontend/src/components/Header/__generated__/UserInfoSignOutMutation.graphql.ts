/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UserInfoSignOutMutationVariables = {};
export type UserInfoSignOutMutationResponse = {
    readonly signOut: {
        readonly ok: boolean;
    };
};
export type UserInfoSignOutMutation = {
    readonly response: UserInfoSignOutMutationResponse;
    readonly variables: UserInfoSignOutMutationVariables;
};



/*
mutation UserInfoSignOutMutation {
  signOut {
    ok
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Result",
    "kind": "LinkedField",
    "name": "signOut",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "ok",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "UserInfoSignOutMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "UserInfoSignOutMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "ea939639fac1e0aadf6ff8dc51e9570e",
    "id": null,
    "metadata": {},
    "name": "UserInfoSignOutMutation",
    "operationKind": "mutation",
    "text": "mutation UserInfoSignOutMutation {\n  signOut {\n    ok\n  }\n}\n"
  }
};
})();
(node as any).hash = '365034ea4b1795b2e912504bf69a7f7e';
export default node;
