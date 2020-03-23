import React from 'react';
import clsx from 'clsx';

function HeaderLink({ label, selected }: { label: string, selected?: boolean }) {
    return (
        <a
            href="#"
            className={clsx(
                'mr-4 px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:text-white focus:bg-gray-700',
                selected ? 'text-white bg-gray-900' : 'text-gray-300 hover:text-white hover:bg-gray-700',
            )}
        >
            {label}
        </a>
    );
}

export default function Header() {
    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 text-white text-lg font-semibold">DaaS</div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline">
                                <HeaderLink label="Dashboard" selected />
                                <HeaderLink label="Organizations" />
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            <button className="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700">
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
                            <div className="ml-3 relative">
                                <div>
                                    <button className="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid">
                                        <img
                                            className="h-8 w-8 rounded-full"
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            alt=""
                                        />
                                    </button>
                                </div>
                                <div className="hidden origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                                    <div className="py-1 rounded-md bg-white shadow-xs">
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Your Profile
                                        </a>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Settings
                                        </a>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Sign out
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white">
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
                </div>
            </div>
            <div className="hidden md:hidden">
                <div className="px-2 pt-2 pb-3 sm:px-3">
                    <a
                        href="#"
                        className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"
                    >
                        Dashboard
                    </a>
                    <a
                        href="#"
                        className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                    >
                        Team
                    </a>
                    <a
                        href="#"
                        className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                    >
                        Projects
                    </a>
                    <a
                        href="#"
                        className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                    >
                        Calendar
                    </a>
                    <a
                        href="#"
                        className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                    >
                        Reports
                    </a>
                </div>
                <div className="pt-4 pb-3 border-t border-gray-700">
                    <div className="flex items-center px-5">
                        <div className="flex-shrink-0">
                            <img
                                className="h-10 w-10 rounded-full"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                            />
                        </div>
                        <div className="ml-3">
                            <div className="text-base font-medium leading-none text-white">
                                Tom Cook
                            </div>
                            <div className="mt-1 text-sm font-medium leading-none text-gray-400">
                                tom@example.com
                            </div>
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
        </nav>
    );
}
