import React from 'react';
import clsx from 'clsx';
import OptionalLink from './util/OptionalLink';

export function ListItem({
    to,
    children,
}: {
    to?: string;
    children: React.ReactNode;
}) {
    return (
        <li className="border-b border-gray-200 last:border-b-0">
            <OptionalLink
                to={to}
                className={clsx(
                    'block',
                    to &&
                        'hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out',
                )}
            >
                <div className="flex items-center px-4 py-4 sm:px-6">
                    <div className="min-w-0 flex-1 flex items-center">
                        <div className="min-w-0 flex-1">
                            <div>{children}</div>
                        </div>
                    </div>
                    {to && (
                        <div>
                            <svg
                                className="h-5 w-5 text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    )}
                </div>
            </OptionalLink>
        </li>
    );
}

export default function List<T>({
    items,
    children,
}: {
    items?: readonly T[];
    children: (item: T, i: number) => React.ReactNode;
}) {
    // TODO: better UI
    if (!items) return null;

    return <ul>{items.map((item, i) => children(item, i))}</ul>;
}
