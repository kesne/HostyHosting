import React, { useMemo } from 'react';
import clsx from 'clsx';
import OptionalLink from './util/OptionalLink';

export function ListItem({ to, children }: { to?: string; children: React.ReactNode }) {
    return (
        <li>
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

type Connection<T> = {
    readonly edges: ReadonlyArray<{
        readonly node: T;
    }>;
};

export default function List<T>({
    items,
    connection,
    children,
}: {
    items?: readonly T[];
    connection?: Connection<T>;
    children: (item: T, i: number) => React.ReactNode;
}) {
    const nodes = useMemo(() => {
        if (items) {
            return items;
        }
        if (connection) {
            return connection.edges.map(({ node }) => node);
        }
        return [];
    }, [items, connection]);

    if (!nodes.length)
        return (
            <div className="text-gray-500 m-6 flex flex-col items-center flex-1 justify-center">
                <svg
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    className="h-12"
                >
                    <path d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                </svg>
                <div>No Data</div>
            </div>
        );

    return (
        <ul className="divide-y divide-gray-200">{nodes.map((item, i) => children(item, i))}</ul>
    );
}
