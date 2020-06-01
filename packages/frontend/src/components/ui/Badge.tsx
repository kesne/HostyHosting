import React from 'react';

type Props = {
    label: string;
};

export default function Badge({ label }: Props) {
    return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-gray-100 text-gray-800">
            {label}
        </span>
    );
}
