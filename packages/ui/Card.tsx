import React from 'react';
import Title from './Title';

export function CardContent({ children }: { children: React.ReactNode }) {
    return <div className="px-4 py-5 sm:p-6">{children}</div>;
}

export default function Card({
    header,
    title,
    actions,
    children
}: {
    header?: React.ReactNode;
    title?: string;
    actions?: React.ReactNode;
    children: React.ReactNode;
}) {
    const hasHeader = !!header || !!title || !!actions;
    return (
        <div className="bg-white overflow-hidden sm:rounded-lg sm:shadow">
            {hasHeader && (
                <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
                    {header}
                    {(title || actions) && (
                        <div className="flex items-center">
                            <div className="flex-grow">
                                <Title>{title}</Title>
                            </div>
                            <div>{actions}</div>
                        </div>
                    )}
                </div>
            )}
            {children}
        </div>
    );
}
