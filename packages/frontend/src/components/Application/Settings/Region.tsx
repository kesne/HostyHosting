import React from 'react';
import clsx from 'clsx';
import Card, { CardContent } from '../../ui/Card';
import { EnterItem } from '../../ui/motion/Enter';

type Props = {
    title: string;
    description?: string;
    children: React.ReactNode;
    first?: boolean;
};

export default function Region({ title, description, children, first }: Props) {
    return (
        <EnterItem className={clsx('my-6', first && 'mt-0')}>
            <Card>
                <CardContent>
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
                            {description && (
                                <p className="mt-1 text-sm leading-5 text-gray-500">
                                    {description}
                                </p>
                            )}
                        </div>
                        <div className="mt-5 md:mt-0 md:col-span-2">{children}</div>
                    </div>
                </CardContent>
            </Card>
        </EnterItem>
    );
}
