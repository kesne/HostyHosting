import React from 'react';
import ButtonOrLink from '../ui/util/ButtonOrLink';
import clsx from 'clsx';

export default function HeaderLink({
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
