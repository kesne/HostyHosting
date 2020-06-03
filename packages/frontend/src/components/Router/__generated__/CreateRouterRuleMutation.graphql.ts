/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type CreateRouterRuleInput = {
    routerID: string;
    componentID: string;
    environmentID: string;
    domain: string;
    pathPrefix?: string | null;
    forwardPathPrefix?: boolean | null;
};
export type CreateRouterRuleMutationVariables = {
    input: CreateRouterRuleInput;
};
export type CreateRouterRuleMutationResponse = {
    readonly createRouterRule: {
        readonly id: string;
    };
};
export type CreateRouterRuleMutation = {
    readonly response: CreateRouterRuleMutationResponse;
    readonly variables: CreateRouterRuleMutationVariables;
};



/*
mutation CreateRouterRuleMutation(
  $input: CreateRouterRuleInput!
) {
  createRouterRule(input: $input) {
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input",
    "type": "CreateRouterRuleInput!"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "RouterRule",
    "kind": "LinkedField",
    "name": "createRouterRule",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
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
    "name": "CreateRouterRuleMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateRouterRuleMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "CreateRouterRuleMutation",
    "operationKind": "mutation",
    "text": "mutation CreateRouterRuleMutation(\n  $input: CreateRouterRuleInput!\n) {\n  createRouterRule(input: $input) {\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'f8b9e2f321b3e4afd7a4d38d5f6aed67';
export default node;
