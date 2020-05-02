import React, { useEffect } from 'react';
import clsx from 'clsx';
import { Link, useNavigate } from 'react-router-dom';
import OutsideClickHandler from 'react-outside-click-handler';
import { motion, AnimatePresence } from 'framer-motion';
import ButtonOrLink from '../ui/util/ButtonOrLink';
import useBoolean from '../../utils/useBoolean';
import useMediaQuery from '../../utils/useMediaQuery';
import { MEDIA_QUERIES } from '../ui/constants';
import { useSignOutMutation, useMeDaddyLazyQuery } from '../../queries';
import { useHasUser } from '../../utils/user';
import Notifications from './Notifications';

function HeaderLink({
    to,
    onClick,
    selected,
    children,
}: {
    to?: string;
    onClick?: () => void;
    selected?: boolean;
    children: React.ReactNode;
}) {
    return (
        <ButtonOrLink
            to={to}
            onClick={onClick}
            className={clsx(
                'block md:inline-block md:mr-4 last:mr-0 px-3 py-2 rounded-md text-base md:text-sm font-medium focus:outline-none focus:text-white focus:bg-gray-700',
                selected
                    ? 'text-white bg-gray-900'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700',
            )}
        >
            {children}
        </ButtonOrLink>
    );
}

export default function Header() {
    const navigate = useNavigate();
    const [fetchUserData, { data }] = useMeDaddyLazyQuery();
    const [signOut] = useSignOutMutation();
    const [navOpen, { toggle: navToggle, off: navOff }] = useBoolean(false);
    const [dropdownOpen, { toggle: dropdownToggle, off: dropdownOff }] = useBoolean(false);
    const [notificationsOpen, { toggle: notificationsToggle }] = useBoolean(false);
    const mediumOrBigger = useMediaQuery(MEDIA_QUERIES.MEDIUM);
    const hasUser = useHasUser();

    useEffect(() => {
        if (hasUser) {
            fetchUserData();
        }
    }, [hasUser]);

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

    async function handleSignOut() {
        await signOut();
        navigate('/auth/sign-in');
    }

    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 text-white text-lg font-semibold">
                            HostyHosting
                        </Link>
                        {hasUser && (
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline">{headerLinks}</div>
                            </div>
                        )}
                    </div>
                    {hasUser && (
                        <div className="hidden md:block">
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
                                    <OutsideClickHandler onOutsideClick={dropdownOff}>
                                        <div>
                                            <HeaderLink onClick={dropdownToggle}>
                                                {data?.me.name}
                                            </HeaderLink>
                                        </div>
                                        <AnimatePresence>
                                            {dropdownOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    transition={{ duration: 0.1, ease: 'easeOut' }}
                                                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg z-10"
                                                    // Whenever there's a click inside of the dropdown, we want to close the dropdown.
                                                    onClick={dropdownOff}
                                                >
                                                    <div className="py-1 rounded-md bg-white shadow-xs">
                                                        <Link
                                                            to="/account"
                                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                        >
                                                            Your Account
                                                        </Link>
                                                        <button
                                                            onClick={handleSignOut}
                                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                        >
                                                            Sign out
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </OutsideClickHandler>
                                </div>
                            </div>
                        </div>
                    )}
                    {hasUser && (
                        <div className="-mr-2 flex md:hidden">
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
            {hasUser && navOpen && (
                <div>
                    <div className="px-2 pt-2 pb-3 sm:px-3">{headerLinks}</div>
                    <div className="pt-4 pb-3 border-t border-gray-700">
                        <div className="px-5">
                            <div className="text-base font-medium leading-none text-white">
                                {data?.me?.name}
                            </div>
                            <div className="mt-1 text-sm font-medium leading-none text-gray-400">
                                {data?.me?.email}
                            </div>
                        </div>
                        <div className="mt-3 px-2">
                            <a
                                href="#"
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                            >
                                Your Profile
                            </a>
                            <a
                                href="#"
                                className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                            >
                                Settings
                            </a>
                            <a
                                href="#"
                                className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                            >
                                Sign out
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
