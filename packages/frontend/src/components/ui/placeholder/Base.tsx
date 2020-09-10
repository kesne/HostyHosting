import React from 'react';
import clsx from 'clsx';

type Props = {
    className?: string;
    children?: React.ReactNode;
};

export default function Base({ className, children }: Props) {
    return <div className={clsx('animate-pulse bg-gray-400 rounded', className)}>{children}</div>;
}
