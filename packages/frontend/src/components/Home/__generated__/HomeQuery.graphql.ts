/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeQueryVariables = {
    organization?: string | null;
};
export type HomeQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"SelectOrganization_me">;
    };
    readonly organization: {
        readonly " $fragmentRefs": FragmentRefs<"Applications_organization" | "Environments_organization">;
    };
};
export type HomeQuery = {
    readonly response: HomeQueryResponse;
    readonly variables: HomeQueryVariables;
};



/*
query HomeQuery(
  $organization: String
) {
  me {
    ...SelectOrganization_me
    id
  }
  organization(username: $organization) {
    ...Applications_organization
    ...Environments_organization
    id
  }
}

fragment Applications_organization on Organization {
  id
  username
  applications {
    id
    name
    description
  }
}

fragment Environments_organization on Organization {
  id
  environments {
    id
    name
    label
  }
}

fragment SelectOrganization_me on User {
  id
  personalOrganization {
    id
  }
  organizations {
    id
    name
    username
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "organization",
    "type": "String"
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
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "HomeQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SelectOrganization_me"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Organization",
        "kind": "LinkedField",
        "name": "organization",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Applications_organization"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Environments_organization"
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
    "name": "HomeQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Organization",
            "kind": "LinkedField",
            "name": "personalOrganization",
            "plural": false,
            "selections": [
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Organization",
            "kind": "LinkedField",
            "name": "organizations",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Organization",
        "kind": "LinkedField",
        "name": "organization",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Application",
            "kind": "LinkedField",
            "name": "applications",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "description",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Environment",
            "kind": "LinkedField",
            "name": "environments",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "label",
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
    "name": "HomeQuery",
    "operationKind": "query",
    "text": "query HomeQuery(\n  $organization: String\n) {\n  me {\n    ...SelectOrganization_me\n    id\n  }\n  organization(username: $organization) {\n    ...Applications_organization\n    ...Environments_organization\n    id\n  }\n}\n\nfragment Applications_organization on Organization {\n  id\n  username\n  applications {\n    id\n    name\n    description\n  }\n}\n\nfragment Environments_organization on Organization {\n  id\n  environments {\n    id\n    name\n    label\n  }\n}\n\nfragment SelectOrganization_me on User {\n  id\n  personalOrganization {\n    id\n  }\n  organizations {\n    id\n    name\n    username\n  }\n}\n"
  }
};
})();
(node as any).hash = 'f643b8810315f5086e92044bb4abdb10';
export default node;
