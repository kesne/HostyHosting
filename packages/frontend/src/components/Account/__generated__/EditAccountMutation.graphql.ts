/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type EditAccountMutationVariables = {
    username: string;
    name: string;
    email: string;
};
export type EditAccountMutationResponse = {
    readonly updateAccount: {
        readonly id: string;
        readonly username: string;
        readonly name: string;
        readonly email: string;
    };
};
export type EditAccountMutation = {
    readonly response: EditAccountMutationResponse;
    readonly variables: EditAccountMutationVariables;
};



/*
mutation EditAccountMutation(
  $username: String!
  $name: String!
  $email: String!
) {
  updateAccount(username: $username, name: $name, email: $email) {
    id
    username
    name
    email
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "username",
    "type": "String!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "name",
    "type": "String!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "email",
    "type": "String!"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "email",
        "variableName": "email"
      },
      {
        "kind": "Variable",
        "name": "name",
        "variableName": "name"
      },
      {
        "kind": "Variable",
        "name": "username",
        "variableName": "username"
      }
    ],
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "updateAccount",
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
        "name": "username",
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
        "name": "email",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EditAccountMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditAccountMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "EditAccountMutation",
    "operationKind": "mutation",
    "text": "mutation EditAccountMutation(\n  $username: String!\n  $name: String!\n  $email: String!\n) {\n  updateAccount(username: $username, name: $name, email: $email) {\n    id\n    username\n    name\n    email\n  }\n}\n"
  }
};
})();
(node as any).hash = '8e80f6486a4ef29afab9f2ba3eb81943';
export default node;
