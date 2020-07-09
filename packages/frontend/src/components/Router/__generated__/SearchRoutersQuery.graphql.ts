/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type SearchRoutersQueryVariables = {
    organization: string;
};
export type SearchRoutersQueryResponse = {
    readonly organization: {
        readonly routers: ReadonlyArray<{
            readonly id: string;
            readonly label: string;
        }>;
    };
};
export type SearchRoutersQuery = {
    readonly response: SearchRoutersQueryResponse;
    readonly variables: SearchRoutersQueryVariables;
};



/*
query SearchRoutersQuery(
  $organization: String!
) {
  organization(username: $organization) {
    routers {
      id
      label
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "organization",
    "type": "String!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "username",
    "variableName": "organization"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "concreteType": "Router",
  "kind": "LinkedField",
  "name": "routers",
  "plural": true,
  "selections": [
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "label",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SearchRoutersQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Organization",
        "kind": "LinkedField",
        "name": "organization",
        "plural": false,
        "selections": [
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SearchRoutersQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Organization",
        "kind": "LinkedField",
        "name": "organization",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "SearchRoutersQuery",
    "operationKind": "query",
    "text": "query SearchRoutersQuery(\n  $organization: String!\n) {\n  organization(username: $organization) {\n    routers {\n      id\n      label\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '5e1ea9483e4953ae33cfde11d4aa7631';
export default node;
