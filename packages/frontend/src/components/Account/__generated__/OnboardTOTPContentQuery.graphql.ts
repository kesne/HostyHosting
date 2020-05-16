/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type OnboardTOTPContentQueryVariables = {};
export type OnboardTOTPContentQueryResponse = {
    readonly me: {
        readonly id: string;
        readonly name: string;
        readonly onboardTOTP: string;
    };
};
export type OnboardTOTPContentQuery = {
    readonly response: OnboardTOTPContentQueryResponse;
    readonly variables: OnboardTOTPContentQueryVariables;
};



/*
query OnboardTOTPContentQuery {
  me {
    id
    name
    onboardTOTP
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "CurrentUser",
    "kind": "LinkedField",
    "name": "me",
    "plural": false,
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "onboardTOTP",
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
    "name": "OnboardTOTPContentQuery",
    "selections": (v0/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "OnboardTOTPContentQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "OnboardTOTPContentQuery",
    "operationKind": "query",
    "text": "query OnboardTOTPContentQuery {\n  me {\n    id\n    name\n    onboardTOTP\n  }\n}\n"
  }
};
})();
(node as any).hash = '64347fe4ce234d195bda5c4d4397bf50';
export default node;
