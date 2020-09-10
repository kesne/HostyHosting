import React from 'react';
import clsx from 'clsx';
import Base from './Base';

export default function Text({ className }: { className: string }) {
    return <Base className={clsx('h-4', className)} />;
}
