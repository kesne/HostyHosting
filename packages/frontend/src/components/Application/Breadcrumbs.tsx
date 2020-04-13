import React, { useContext, useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

type Breadcrumb = {
    name: string;
    url: string;
};

export const BreadcrumbContext = React.createContext<{
    list: Breadcrumb[];
    add(breadcrumb: Breadcrumb): string;
    remove(id: string): void;
} | null>(null);

export function Provider({ root, children }: { root: Breadcrumb; children: React.ReactNode }) {
    const [list, setList] = useState<(Breadcrumb & { id?: string })[]>([root]);

    const breadcrumbs = useMemo(
        () => ({
            list,
            add(breadcrumb: Breadcrumb) {
                // TODO: Make this better:
                const id = String(Math.round(Math.random() * 10000));
                setList(list => [{ ...breadcrumb, id }, ...list]);
                return id;
            },
            remove(id: string) {
                setList(list => list.filter(item => item.id !== id));
            },
        }),
        [list, setList],
    );

    return <BreadcrumbContext.Provider value={breadcrumbs}>{children}</BreadcrumbContext.Provider>;
}

export function useBreadcrumb(breadcrumb: Breadcrumb) {
    const breadcrumbs = useContext(BreadcrumbContext);

    if (!breadcrumbs) {
        throw new Error('This hook must be used in a breadcrumb provider.');
    }

    useEffect(() => {
        const id = breadcrumbs.add(breadcrumb);
        return () => {
            breadcrumbs.remove(id);
        };
    }, [breadcrumb.name, breadcrumb.url]);
}

export default function Breadcrumbs() {
    const breadcrumbs = useContext(BreadcrumbContext);

    if (!breadcrumbs) {
        throw new Error('This hook must be used in a breadcrumb provider.');
    }

    return (
        <h4 className="text-lg leading-6 font-normal text-gray-600 flex items-center">
            {breadcrumbs.list.map((crumb, index) => (
                <React.Fragment key={index}>
                    {index === 0 ? (
                        <div className="text-lg leading-6 font-semibold text-gray-900">
                            {crumb.name}
                        </div>
                    ) : (
                        <Link to={crumb.url}>{crumb.name}</Link>
                    )}
                    {index < breadcrumbs.list.length - 1 && (
                        <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            className="w-4 h-4 mx-2"
                        >
                            <path d="M15 19l-7-7 7-7"></path>
                        </svg>
                    )}
                </React.Fragment>
            ))}
        </h4>
    );
}
