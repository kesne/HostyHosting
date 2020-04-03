import React from 'react';
import formatDate from '../../utils/formatDate';

export default function Notification({ notification }: any) {
    return (
        <div className="p-3 flex border-b border-gray-200 last:border-0">
            <div className="flex-1">
                <p className="text-base text-gray-800">{notification.title}</p>
                <p className="text-sm text-gray-500">{notification.body}</p>
            </div>
            {/* TODO: We probbaly want relative time formatting here: */}
            <div className="text-sm text-gray-500">{formatDate(notification.createdAt)}</div>
        </div>
    );
}
