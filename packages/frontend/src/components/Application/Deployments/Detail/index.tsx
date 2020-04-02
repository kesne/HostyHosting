import React from 'react';
import { useParams } from 'react-router-dom';
import { useDeploymentQuery } from '../../../../queries';
import Card, { CardContent } from '../../../ui/Card';
import formatDate from '../../../../utils/formatDate';
import Button from '../../../ui/Button';

export default function Detail() {
    const params = useParams<{ application: string; deployment: string }>();
    const { data } = useDeploymentQuery({
        variables: {
            app: Number(params.application),
            deployment: Number(params.deployment),
        },
    });

    if (!data) {
        return <div>Hol' up.</div>;
    }

    return (
        <div>
            <Card
                title={data.application.deployment.label}
                actions={<Button variant="danger">Delete</Button>}
            >
                <div className="px-4 py-5 sm:p-0">
                    <dl>
                        <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                            <dt className="text-sm leading-5 font-medium text-gray-500">
                                Created At
                            </dt>
                            <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                {formatDate(data.application.deployment.createdAt)}
                            </dd>
                        </div>
                        <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                            <dt className="text-sm leading-5 font-medium text-gray-500">
                                Last Updated
                            </dt>
                            <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                {formatDate(data.application.deployment.updatedAt)}
                            </dd>
                        </div>
                        <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                            <dt className="text-sm leading-5 font-medium text-gray-500">Image</dt>
                            <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                {data.application.deployment.image}
                            </dd>
                        </div>
                        <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                            <dt className="text-sm leading-5 font-medium text-gray-500">
                                Strategy
                            </dt>
                            <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                {data.application.deployment.strategy}
                            </dd>
                        </div>
                    </dl>
                </div>
            </Card>
        </div>
    );
}
