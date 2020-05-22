import React from 'react';
import { Link, useNavigate, useMatch, useResolvedLocation, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import useMediaQuery from '../../utils/useMediaQuery';
import { MEDIA_QUERIES } from './constants';

export function VerticalNavItem({
    to,
    icon,
    label,
}: {
    to: string;
    icon?: React.ReactNode;
    label: string;
}) {
    const small = useMediaQuery(MEDIA_QUERIES.SMALL);
    const location = useLocation();
    const toLocation = useResolvedLocation(to);

    const selected = location.pathname === toLocation.pathname;

    if (!small) {
        return <option value={toLocation.pathname}>{label}</option>;
    }

    return (
        <Link
            to={to}
            className={clsx(
                'group flex items-center px-3 py-2 text-sm leading-5 font-medium transition ease-in-out duration-150',
                !selected &&
                    'text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-200',
                selected &&
                    'text-gray-900 rounded-md bg-gray-200 hover:text-gray-900 focus:outline-none focus:bg-gray-300',
            )}
        >
            {icon}
            <span className="truncate">{label}</span>
        </Link>
    );
}

export default function VerticalNav({
    value,
    children,
}: {
    value: string;
    children: React.ReactNode;
}) {
    const navigate = useNavigate();
    const small = useMediaQuery(MEDIA_QUERIES.SMALL);
    function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
        navigate(e.target.value);
    }

    return small ? (
        <nav className="space-y-2">{children}</nav>
    ) : (
        <div>
            <select
                aria-label="Selected tab"
                className="mt-1 form-select block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 transition ease-in-out duration-150"
                onChange={onChange}
                value={value}
            >
                {children}
            </select>
        </div>
    );
}
