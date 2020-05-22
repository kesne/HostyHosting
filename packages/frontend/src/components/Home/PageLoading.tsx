import React from 'react';
import { TextRow } from 'react-placeholder/lib/placeholders';

export default function PageLoading() {
    return (
        <div>
            <div className="p-6 border-b border-gray-200">
                <div className="w-48">
                    <TextRow color="#E0E0E0" />
                </div>
            </div>
            <div className="divide-y divide-gray-200">
                {Array.from({ length: 3 }, () => (
                    <div className="p-6">
                        <div className="w-36">
                            <TextRow color="#E0E0E0" />
                        </div>
                        <div className="w-64">
                            <TextRow color="#E0E0E0" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
