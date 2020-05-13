/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type NotificationsQueryVariables = {};
export type NotificationsQueryResponse = {
    readonly notifications: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"Notification_notification">;
    }>;
};
export type NotificationsQuery = {
    readonly response: NotificationsQueryResponse;
    readonly variables: NotificationsQueryVariables;
};



/*
query NotificationsQuery {
  notifications {
    ...Notification_notification
    id
  }
}

fragment Notification_notification on Notification {
  id
  title
  body
  createdAt
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "NotificationsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Notification",
        "kind": "LinkedField",
        "name": "notifications",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Notification_notification"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "NotificationsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Notification",
        "kind": "LinkedField",
        "name": "notifications",
        "plural": true,
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
            "name": "title",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "body",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "createdAt",
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
    "name": "NotificationsQuery",
    "operationKind": "query",
    "text": "query NotificationsQuery {\n  notifications {\n    ...Notification_notification\n    id\n  }\n}\n\nfragment Notification_notification on Notification {\n  id\n  title\n  body\n  createdAt\n}\n"
  }
};
(node as any).hash = '7a64873c4cddec0673b70f6f7921ca24';
export default node;
