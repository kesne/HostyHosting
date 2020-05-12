import React, { useRef, useEffect } from 'react';
import create from 'zustand';
import { Link } from 'react-router-dom';

type Breadcrumb = {
    name: string;
    url: string;
    actions?: React.ReactElement | null;
};

type StoreState = {
    breadcrumbs: (Breadcrumb & { id: string })[];
    add(breadcrumb: Breadcrumb): string;
    update(id: string, breadcrumb: Breadcrumb): void;
    remove(id: string): void;
};

let nextBreadcrumbId = 0;
const [useStore] = create<StoreState>(set => ({
    breadcrumbs: [],
    add(breadcrumb: Breadcrumb) {
        const id = `crumb-${++nextBreadcrumbId}`;
        set(state => ({ breadcrumbs: [{ ...breadcrumb, id }, ...state.breadcrumbs] }));
        return id;
    },
    update(id: string, breadcrumb: Breadcrumb) {
        set(state => ({
            breadcrumbs: state.breadcrumbs.map(item => {
                if (id === item.id) {
                    return { ...breadcrumb, id };
                }
                return item;
            }),
        }));
    },
    remove(id: string) {
        set(state => ({
            breadcrumbs: state.breadcrumbs.filter(item => item.id !== id),
        }));
    },
}));

export function Breadcrumb({
    children,
    ...breadcrumb
}: Breadcrumb & { children: React.ReactNode }) {
    const currentCrumb = useRef<string>();
    const add = useStore(state => state.add);
    const update = useStore(state => state.update);
    const remove = useStore(state => state.remove);

    if (!currentCrumb.current) {
        currentCrumb.current = add(breadcrumb);
    }

    useEffect(() => {
        update(currentCrumb.current!, breadcrumb);
    }, [breadcrumb.name, breadcrumb.url, breadcrumb.actions]);

    useEffect(() => {
        return () => {
            remove(currentCrumb.current!);
        };
    }, []);

    return <>{children}</>;
}

export function BreadcrumbsHeader({ root }: any) {
    const breadcrumbs = useStore(state => state.breadcrumbs);
    const [current, ...rest] = [...breadcrumbs, ...root];

    return (
        <div>
            <div>
                <nav className="sm:hidden">
                    <a
                        href="#"
                        className="flex items-center text-sm leading-5 font-medium text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out"
                    >
                        <svg
                            className="flex-shrink-0 -ml-1 mr-1 h-5 w-5 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Back
                    </a>
                </nav>
                <nav className="hidden sm:flex items-center text-sm leading-5 font-medium">
                    {rest.reverse().map((breadcrumb, index) => (
                        <React.Fragment key={index}>
                            <Link
                                to={breadcrumb.url}
                                className="text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out"
                            >
                                {breadcrumb.name}
                            </Link>
                            {index !== rest.length - 1 && (
                                <svg
                                    className="flex-shrink-0 mx-2 h-5 w-5 text-gray-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            )}
                        </React.Fragment>
                    ))}
                </nav>
            </div>
            <div className="mt-2 md:flex md:items-center md:justify-between">
                <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate">
                        {current.name}
                    </h2>
                </div>
                <div className="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">{current.actions}</div>
            </div>
        </div>
    );
}
