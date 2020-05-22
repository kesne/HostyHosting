import React from 'react';
import { TextRow } from 'react-placeholder/lib/placeholders';

export default function Loader() {
    return (
        <div className="rounded bg-gray-50">
            <div className="p-6 border-b border-gray-200">
                <div className="w-1/5">
                    <TextRow color="#E0E0E0" />
                </div>
            </div>
            <div className="p-6 space-y-6">
                <div className="w-3/5">
                    <TextRow color="#E0E0E0" />
                </div>
                <div className="w-2/5">
                    <TextRow color="#E0E0E0" />
                </div>
                <div className="w-2/3">
                    <TextRow color="#E0E0E0" />
                </div>
            </div>
        </div>
    );
}
