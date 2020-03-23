import React from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';

export default function Link(props: LinkProps) {
    return (
        <RouterLink
            className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
            {...props}
        />
    );
}
