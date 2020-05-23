import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    useMemo,
    useRef,
    useCallback,
} from 'react';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';

type Crumb = {
    name: string;
    url: string;
};

type CrumbWithID = [number, Crumb];

type Subscriber = (crumbs: Crumb[]) => void;

type CrumbContext = {
    add(id: number, crumb: Crumb): void;
    remove(id: number): void;
    get(): Crumb[];
    subscribe(subscribe: Subscriber): () => void;
};

const CrumbContext = createContext<CrumbContext | null>(null);

type RefContext = [HTMLDivElement | null, (el: HTMLDivElement) => void] | null;
const RefContext = createContext<RefContext>(null);

function useRefContext() {
    const context = useContext(RefContext);
    if (!context) {
        throw new Error('This component was not rendered inside of a ref provider.');
    }
    return context;
}

function useCrumbContext() {
    const context = useContext(CrumbContext);
    if (!context) {
        throw new Error('This component was not rendered inside of a crumb provider.');
    }
    return context;
}

export function Header() {
    const crumbContext = useCrumbContext();
    const [, setActionsEl] = useRefContext();
    const [crumbs, setCrumbs] = useState(crumbContext.get());

    useEffect(() => {
        return crumbContext.subscribe(setCrumbs);
    }, [crumbContext]);

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
                        {current.name}
                    </h2>
                </div>
                <div className="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4" ref={setActionsEl} />
            </div>
        </div>
    );
}

function getCrumb(crumbWithID: CrumbWithID) {
    return crumbWithID[1];
}

export function Provider({ children }: { children: React.ReactNode }) {
    const subscribers = useRef<Set<Subscriber>>(new Set());
    const crumbs = useRef<CrumbWithID[]>([]);
    const actionsContext = useState<HTMLDivElement | null>(null);

    const setCrumbs = useCallback(
        (newCrumbs: CrumbWithID[]) => {
            crumbs.current = newCrumbs;
            Promise.resolve().then(() => {
                subscribers.current.forEach(sub => {
                    sub(newCrumbs.map(getCrumb));
                });
            });
        },
        [crumbs, subscribers],
    );

    const crumbContext = useMemo<CrumbContext>(
        () => ({
            get() {
                return crumbs.current.map(getCrumb);
            },
            subscribe(sub: Subscriber) {
                subscribers.current.add(sub);
                return () => {
                    subscribers.current.delete(sub);
                };
            },
            add(id, crumb) {
                setCrumbs([[id, crumb], ...crumbs.current]);
            },
            remove(id) {
                setCrumbs(crumbs.current.filter(([cid]) => cid !== id));
            },
        }),
        [],
    );

    return (
        <CrumbContext.Provider value={crumbContext}>
            <RefContext.Provider value={actionsContext}>{children}</RefContext.Provider>
        </CrumbContext.Provider>
    );
}

export function Crumb({ children, ...crumb }: Crumb & { children: React.ReactNode }) {
    const context = useCrumbContext();
    const [id] = useState(() => Math.random());
    const hasAdded = useRef(false);

    if (!hasAdded.current) {
        context.add(id, crumb);
        hasAdded.current = true;
    }

    useEffect(() => {
        return () => {
            context.remove(id);
        };
    }, []);

    return <>{children}</>;
}

export function CrumbActions({ children }: { children: React.ReactNode }) {
    const [actionsEl] = useRefContext();

    if (!actionsEl) {
        return null;
    }

    return createPortal(children, actionsEl);
}
