import React from 'react';
import Text from './Text';
import Base from './Base';

export default function Card({ children }: { children?: React.ReactNode }) {
    return (
        <Base className="rounded bg-opacity-25 shadow-sm">
            <div className="p-6 border-b border-gray-100">
                <Text className="w-1/5" />
            </div>
            <div className="p-6 space-y-6">
                {children ?? (
                    <>
                        <Text className="w-3/4" />
                        <Text className="w-1/3" />
                        <Text className="w-1/2" />
                    </>
                )}
            </div>
        </Base>
    );
}
