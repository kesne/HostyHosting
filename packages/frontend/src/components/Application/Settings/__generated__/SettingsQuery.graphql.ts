/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsQueryVariables = {
    application: string;
};
export type SettingsQueryResponse = {
    readonly application: {
        readonly " $fragmentRefs": FragmentRefs<"Information_application" | "Delete_application">;
    };
};
export type SettingsQuery = {
    readonly response: SettingsQueryResponse;
    readonly variables: SettingsQueryVariables;
};



/*
query SettingsQuery(
  $application: ID!
) {
  application(id: $application) {
    ...Information_application
    ...Delete_application
    id
  }
}

fragment Delete_application on Application {
  id
  name
}

fragment Information_application on Application {
  id
  name
  description
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "application"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "application"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SettingsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Application",
        "kind": "LinkedField",
        "name": "application",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Information_application"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Delete_application"
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
    "name": "SettingsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Application",
        "kind": "LinkedField",
        "name": "application",
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
            "name": "description",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "0cbf2abf09c65825214ffecac3268ba1",
    "id": null,
    "metadata": {},
    "name": "SettingsQuery",
    "operationKind": "query",
    "text": "query SettingsQuery(\n  $application: ID!\n) {\n  application(id: $application) {\n    ...Information_application\n    ...Delete_application\n    id\n  }\n}\n\nfragment Delete_application on Application {\n  id\n  name\n}\n\nfragment Information_application on Application {\n  id\n  name\n  description\n}\n"
  }
};
})();
(node as any).hash = '60b888d9123317224c1967c8fdac8e31';
export default node;
