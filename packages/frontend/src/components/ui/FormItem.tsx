import React from 'react';
import Label from './Label';

export default function FormItem({
    label,
    children,
    error,
}: {
    label: string;
    children: React.ReactNode;
    error?: string;
}) {
    return (
        <div>
            <Label>
                {label}
                <div className="mt-1 relative rounded-md shadow-sm">{children}</div>
                {typeof error !== 'undefined' && (
                    <p className="mt-2 text-sm text-red-600">{error}</p>
                )}
            </Label>
        </div>
    );
}
