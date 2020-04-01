import React from 'react';

export default function Label({ children }: { children: React.ReactNode }) {
    return <label className="block text-sm font-medium leading-5 text-gray-700">{children}</label>;
}
