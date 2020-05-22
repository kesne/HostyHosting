import React from 'react';
import Card from '../../ui/Card';
import formatDate from '../../../utils/formatDate';
import { useApplicationParams } from '../ApplicationContext';
import { useLazyLoadQuery, graphql } from 'react-relay/hooks';
import { OverviewQuery } from './__generated__/OverviewQuery.graphql';

export default function Overview() {
    const params = useApplicationParams();

    const data = useLazyLoadQuery<OverviewQuery>(
        graphql`
            query OverviewQuery($application: ID!) {
                application(id: $application) {
                    id
                    description
                    updatedAt
                    createdAt
                    createdBy {
                        name
                    }
                }
            }
        `,
        {
            application: params.application,
        },
    );

    const { application } = data;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card title="Details">
                <div className="px-4 py-5 sm:p-0">
                    <dl>
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                            <dt className="text-sm leading-5 font-medium text-gray-500">
                                Created By
                            </dt>
                            <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                <a>{application.createdBy?.name}</a>
                            </dd>
                        </div>
                        <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                            <dt className="text-sm leading-5 font-medium text-gray-500">
                                Created At
                            </dt>
                            <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                {formatDate(application.createdAt)}
                            </dd>
                        </div>
                        <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                            <dt className="text-sm leading-5 font-medium text-gray-500">
                                Last Updated
                            </dt>
                            <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                {formatDate(application.updatedAt)}
                            </dd>
                        </div>
                        <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                            <dt className="text-sm leading-5 font-medium text-gray-500">
                                Description
                            </dt>
                            <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                {application.description}
                            </dd>
                        </div>
                    </dl>
                </div>
            </Card>
            <Card title="Deployment History">TODO</Card>
        </div>
    );
}
