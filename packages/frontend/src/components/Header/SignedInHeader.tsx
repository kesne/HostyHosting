import React, { useEffect, Suspense } from 'react';
import { Link } from 'react-router-dom';
import useBoolean from '../../utils/useBoolean';
import useMediaQuery from '../../utils/useMediaQuery';
import { MEDIA_QUERIES } from '../ui/constants';
import Notifications from './Notifications';
import UserInfo from './UserInfo';
import HeaderLink from './HeaderLink';

export default function SignedInHeader() {
    const [navOpen, { toggle: navToggle, off: navOff }] = useBoolean(false);
    const [notificationsOpen, { toggle: notificationsToggle }] = useBoolean(false);
    const mediumOrBigger = useMediaQuery(MEDIA_QUERIES.MEDIUM);

    useEffect(() => {
        if (mediumOrBigger) {
            navOff();
        }
    }, [mediumOrBigger]);

    const headerLinks = (
        <>
            <HeaderLink to="/">Dashboard</HeaderLink>
            <HeaderLink to="/organizations">Organizations</HeaderLink>
        </>
    );

    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 text-white text-lg font-semibold">
                            HostyHosting
                        </Link>
                        {mediumOrBigger && (
                            <div className="ml-10 flex items-baseline">{headerLinks}</div>
                        )}
                    </div>
                    {mediumOrBigger ? (
                        <div className="ml-4 flex items-center md:ml-6">
                            <div className="relative">
                                <button
                                    onClick={notificationsToggle}
                                    className="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                        />
                                    </svg>
                                </button>
                                {notificationsOpen && <Notifications />}
                            </div>
                            <div className="ml-3 relative">
                                <Suspense fallback={null}>
                                    <UserInfo />
                                </Suspense>
                            </div>
                        </div>
                    ) : (
                        <div className="-mr-2 flex">
                            <button
                                onClick={navToggle}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className="inline-flex"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className="hidden"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {!mediumOrBigger && navOpen && (
                <div>
                    <div className="px-2 pt-2 pb-3 sm:px-3">{headerLinks}</div>
                    <div className="pt-4 pb-3 border-t border-gray-700">
                        <Suspense fallback={null}>
                            <UserInfo />
                        </Suspense>
                    </div>
                </div>
            )}
        </nav>
    );
}
