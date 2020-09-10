import React from 'react';
import clsx from 'clsx';

type Props = {
    className?: string;
    children: React.ReactNode;
};

export default function Container({ children, className }: Props) {
    return <div className={clsx('space-y-4', className)}>{children}</div>;
}
