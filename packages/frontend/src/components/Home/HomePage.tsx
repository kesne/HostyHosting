import React from 'react';
import Title from '../ui/Title';

type Props = {
    children: React.ReactNode;
    title: string;
    actions?: React.ReactNode;
};

export default function HomePage({ children, title, actions }: Props) {
    return (
        <>
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex items-center">
                <div className="flex-1">
                    <Title>{title}</Title>
                </div>
                {actions && <div>{actions}</div>}
            </div>
            {children}
        </>
    );
}
