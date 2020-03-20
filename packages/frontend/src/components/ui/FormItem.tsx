import React from 'react';

export default function FormItem({
    label,
    children,
    error
}: {
    label: string;
    children: React.ReactNode;
    error?: string;
}) {
    return (
        <div>
            <label className="block text-sm font-medium leading-5 text-gray-700">
                {label}
                <div className="mt-1 relative rounded-md shadow-sm">{children}</div>
                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </label>
        </div>
    );
}
