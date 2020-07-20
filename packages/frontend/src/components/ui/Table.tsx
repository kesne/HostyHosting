import React from 'react';
import clsx from 'clsx';
import { Connection } from './types';

export function TableHeader({ label }: { label: string }) {
    return (
        <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            {label}
        </th>
    );
}

export function TableDataCell({
    children,
    variant = 'primary',
    className,
}: {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
    className?: string;
}) {
    return (
        <td
            className={clsx(
                'px-6 py-4 whitespace-no-wrap text-sm leading-5',
                variant === 'primary' && 'font-medium text-gray-900',
                variant === 'secondary' && 'text-gray-500',
                className,
            )}
        >
            {children}
        </td>
    );
}

export function TableRow({ children }: { children: React.ReactNode }) {
    return (
        <tr className="bg-white odd:bg-gray-50">
            {children}
            {/* <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                    Edit
                </a>
            </td> */}
        </tr>
    );
}

export default function Table<T>({
    header,
    connection,
    children,
}: {
    header: React.ReactNode;
    connection: Connection<T>;
    children: (item: T, i: number) => React.ReactNode;
}) {
    return (
        <table className="min-w-full">
            <thead>
                <tr>{header}</tr>
            </thead>
            <tbody>{connection.edges.map((item, i) => children(item.node, i))}</tbody>
        </table>
    );
}
