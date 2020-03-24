import React from 'react';
import { Link } from 'react-router-dom';

export default function OptionalLink({
    to,
    ...props
}: {
    to?: string;
    children?: React.ReactNode;
    className?: string;
}) {
    if (to) {
        return <Link to={to} {...props} />;
    }

    return <div {...props} />;
}
