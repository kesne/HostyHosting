import React, { createContext, useContext, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import create from 'zustand';

type Crumb = {
    name: string | React.ReactNode;
    url: string;
};

const [useCrumbState] = create<{
    crumbs: Crumb[];
    setCrumbs: (setter: (crumbs: Crumb[]) => Crumb[]) => void;
}>(set => ({
    crumbs: [],
    setCrumbs: setter => set(({ crumbs: oldCrumbs }) => ({ crumbs: setter(oldCrumbs) })),
}));

const [useActionRefState] = create<{
    ref: HTMLDivElement | null;
    setRef(ref: HTMLDivElement | null): void;
}>(set => ({
    ref: null,
    setRef: ref => set({ ref }),
}));

export function Header() {
    const crumbs = useCrumbState(({ crumbs }) => crumbs);
    const setActionsRef = useActionRefState(({ setRef }) => setRef);

    const [current, ...rest] = crumbs;

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
                        {current?.name}
                    </h2>
                </div>
                <div className="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4" ref={setActionsRef} />
            </div>
        </div>
    );
}

const CrumbParentCompleteContext = createContext<(cb: () => void) => void>(cb => cb());

// TODO: Should we resolve the "url" relative to the current history.
export function Crumb({ children, ...crumb }: Crumb & { children: React.ReactNode }) {
    const onParentComplete = useContext(CrumbParentCompleteContext);
    const setCrumbs = useCrumbState(({ setCrumbs }) => setCrumbs);
    const hasRendered = useRef(false);
    const childCallback = useRef<(() => void) | null>(null);

    const onDone = useMemo(
        () => (cb: () => void) => {
            if (hasRendered.current) {
                cb();
            } else {
                if (childCallback.current) {
                    throw new Error(
                        'Multiple Crumbs were rendered under a parent crumb. This has undefined behavior.',
                    );
                } else {
                    childCallback.current = cb;
                }
            }
        },
        [hasRendered, childCallback],
    );

    useEffect(() => {
        onParentComplete(() => {
            setCrumbs(oldCrumbs => [crumb, ...oldCrumbs]);
            if (childCallback.current) {
                childCallback.current();
            }
            hasRendered.current = true;
        });

        return () => {
            setCrumbs(oldCrumbs => oldCrumbs.filter(c => c !== crumb));
        };
    }, []);

    return (
        <CrumbParentCompleteContext.Provider value={onDone}>
            {children}
        </CrumbParentCompleteContext.Provider>
    );
}

export function CrumbActions({ children }: { children: React.ReactNode }) {
    const actionsRef = useActionRefState(({ ref }) => ref);

    if (!actionsRef) {
        return null;
    }

    return createPortal(children, actionsRef);
}
