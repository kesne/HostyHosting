import React from 'react';
import Notification from './Notification';
import { useNotificationsQuery } from '../../queries';

export default function Notifications() {
    const { data } = useNotificationsQuery();

    return (
        <div className="origin-top-right absolute right-0 mt-2 w-96 rounded-md shadow-lg z-10 h-64 overflow-y-scroll bg-white">
            <h3 className="px-3 py-4 text-lg leading-6 font-medium text-gray-900 border-b border-gray-200 bg-white sticky top-0">
                Notifications
            </h3>
            {data?.notifications.map(notification => (
                <Notification notification={notification} />
            ))}
        </div>
    );
}
