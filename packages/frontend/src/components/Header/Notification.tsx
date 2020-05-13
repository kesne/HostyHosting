import React from 'react';
import formatDate from '../../utils/formatDate';
import { useFragment, graphql } from 'react-relay/hooks';
import { Notification_notification$key } from './__generated__/Notification_notification.graphql';

type Props = {
    notification: Notification_notification$key;
};

export default function Notification({ notification }: Props) {
    const data = useFragment(
        graphql`
            fragment Notification_notification on Notification {
                id
                title
                body
                createdAt
            }
        `,
        notification,
    );

    return (
        <div className="p-3 flex border-b border-gray-200 last:border-0">
            <div className="flex-1">
                <p className="text-base text-gray-800">{data.title}</p>
                <p className="text-sm text-gray-500">{data.body}</p>
            </div>
            {/* TODO: We probbaly want relative time formatting here: */}
            <div className="text-sm text-gray-500">{formatDate(data.createdAt)}</div>
        </div>
    );
}
