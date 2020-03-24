import React from 'react';
import Card from '@daas/ui/Card';
import { useApplicationID } from '../ApplicationContext';
import { useApplicationQuery } from '../../../queries';
import Spinner from '../../Spinner';
import { EnterContainer, EnterItem } from '@daas/ui/motion/Enter';

function formatDate(timestamp: string) {
    return new Date(timestamp).toDateString();
}

export default function Overview() {
    const id = useApplicationID();
    const { data } = useApplicationQuery({
        variables: {
            id
        }
    });

    if (!data) {
        return <Spinner />;
    }

    return (
        <EnterContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <EnterItem>
                <Card
                    header={
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Details</h3>
                    }
                >
                    <div className="px-4 py-5 sm:p-0">
                        <dl>
                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                                <dt className="text-sm leading-5 font-medium text-gray-500">
                                    Created By
                                </dt>
                                <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                    <a>{data.application.createdBy?.name}</a>
                                </dd>
                            </div>
                            <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                                <dt className="text-sm leading-5 font-medium text-gray-500">
                                    Created At
                                </dt>
                                <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                    {formatDate(data.application.createdAt)}
                                </dd>
                            </div>
                            <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                                <dt className="text-sm leading-5 font-medium text-gray-500">
                                    Last Updated
                                </dt>
                                <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                    {formatDate(data.application.updatedAt)}
                                </dd>
                            </div>
                            <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                                <dt className="text-sm leading-5 font-medium text-gray-500">
                                    Description
                                </dt>
                                <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                    {data.application.description}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </Card>
            </EnterItem>
            <EnterItem>
                <Card
                    header={
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Deployment History
                        </h3>
                    }
                >
                    TODO
                </Card>
            </EnterItem>
            <EnterItem>
                <Card
                    header={
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Containers</h3>
                    }
                >
                    TODO
                </Card>
            </EnterItem>
        </EnterContainer>
    );
}
