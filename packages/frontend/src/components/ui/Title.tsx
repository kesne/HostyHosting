import React from 'react';

export default function Title({
    children,
    level = 3,
}: {
    children: React.ReactNode;
    level?: number;
}) {
    if (level === 2) {
        return (
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate">
                {children}
            </h2>
        );
    }
    return <h3 className="text-lg leading-6 font-medium text-gray-900">{children}</h3>;
}
