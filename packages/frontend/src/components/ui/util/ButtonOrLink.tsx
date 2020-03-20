import React from 'react';
import { Link } from 'react-router-dom';
import { HTMLAttributes } from 'react';

export default function ButtonOrLink({
    to,
    ...props
}: HTMLAttributes<HTMLAnchorElement | HTMLButtonElement> & { to?: string }) {
    if (to) {
        return <Link to={to} {...props} />;
    }

    return <button {...props} />;
}
