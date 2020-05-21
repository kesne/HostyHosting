import React from 'react';
import { Link } from 'react-router-dom';
import { HTMLAttributes } from 'react';

export type Props = HTMLAttributes<HTMLAnchorElement | HTMLButtonElement> & { to?: string };

export default function ButtonOrLink({ to, ...props }: Props) {
    if (to) {
        return <Link to={to} {...props} />;
    }

    return <button type="button" {...props} />;
}
