import clsx from 'clsx';
import Link from 'next/link';

export function ListItem({
    last,
    href,
    as,
    children
}: {
    href: string;
    children: React.ReactNode;
    as?: string;
    last?: boolean;
}) {
    return (
        <li>
            <Link href={href} as={as}>
                <a
                    className={clsx(
                        'block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out',
                        {
                            'border-b border-gray-200': !last
                        }
                    )}
                >
                    <div className="flex items-center px-4 py-4 sm:px-6">
                        <div className="min-w-0 flex-1 flex items-center">
                            <div className="min-w-0 flex-1">
                                <div>
                                    {children}
                                </div>
                            </div>
                        </div>
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
                    </div>
                </a>
            </Link>
        </li>
    );
}
