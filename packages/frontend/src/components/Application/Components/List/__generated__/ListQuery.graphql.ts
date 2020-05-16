/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ListQueryVariables = {
    application: string;
};
export type ListQueryResponse = {
    readonly application: {
        readonly id: string;
        readonly components: ReadonlyArray<{
            readonly " $fragmentRefs": FragmentRefs<"Component_component">;
        }>;
    };
};
export type ListQuery = {
    readonly response: ListQueryResponse;
    readonly variables: ListQueryVariables;
};



/*
query ListQuery(
  $application: ID!
) {
  application(id: $application) {
    id
    components {
      ...Component_component
      id
    }
  }
}

fragment Component_component on Component {
  id
  name
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "application",
    "type": "ID!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "application"
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
    "name": "ListQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Application",
        "kind": "LinkedField",
        "name": "application",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Component",
            "kind": "LinkedField",
            "name": "components",
            "plural": true,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "Component_component"
              }
            ],
            "storageKey": null
          }
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
    "name": "ListQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Application",
        "kind": "LinkedField",
        "name": "application",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Component",
            "kind": "LinkedField",
            "name": "components",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "ListQuery",
    "operationKind": "query",
    "text": "query ListQuery(\n  $application: ID!\n) {\n  application(id: $application) {\n    id\n    components {\n      ...Component_component\n      id\n    }\n  }\n}\n\nfragment Component_component on Component {\n  id\n  name\n}\n"
  }
};
})();
(node as any).hash = 'f4a09162175b259c19cf1cb2cf87f206';
export default node;
