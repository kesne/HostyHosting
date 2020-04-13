import React from 'react';
import { useParams } from 'react-router-dom';
import { useComponentQuery, ContainerSize } from '../../../../queries';
import Card, { CardContent } from '../../../ui/Card';
import formatDate from '../../../../utils/formatDate';
import Button from '../../../ui/Button';
import { useBreadcrumb } from '../../Breadcrumbs';
import Secrets from './Secrets';
import EditOrAddSecret from './EditOrAddSecret';
import useBoolean from '../../../../utils/useBoolean';

const MULTIPLIER = {
    [ContainerSize.S1x1]: 1,
    [ContainerSize.S2x2]: 2,
    [ContainerSize.S4x4]: 4,
    [ContainerSize.S8x8]: 8,
    [ContainerSize.S16x16]: 16,
};

function calculateMonthlyCost(size: ContainerSize, count: number) {
    return 2.5 * MULTIPLIER[size] * count;
}

export default function Detail() {
    const params = useParams<{ application: string; component: string }>();
    const { data } = useComponentQuery({
        variables: {
            app: Number(params.application),
            component: Number(params.component),
        },
    });
    const [creating, { on: creatingOn, off: creatingOff }] = useBoolean(false);

    useBreadcrumb({
        name: data?.application.component.name || '...',
        url: `/applications/${params.application}/components/${params.component}`,
    });

    if (!data) {
        return <div>Hol' up.</div>;
    }

    return (
        <>
            <div className="lg:flex lg:items-center lg:justify-between">
                <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate">
                        {data.application.component.name}
                    </h2>
                    <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap">
                        <div className="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mr-6">
                            <svg
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            >
                                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                            </svg>
                            {data.application.component.deploymentStrategy}
                        </div>
                        <div className="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mr-6">
                            <svg
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            >
                                <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                            </svg>
                            {data.application.component.containerGroup.environment.name}
                        </div>
                        <div className="mt-2 flex items-center text-sm leading-5 text-gray-500">
                            <svg
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            >
                                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                            Created on {formatDate(data.application.component.createdAt)}, last
                            updated {formatDate(data.application.component.updatedAt)}
                        </div>
                    </div>
                </div>
                <div className="mt-5 flex lg:mt-0 lg:ml-4">
                    <span className="ml-3 relative shadow-sm rounded-md">
                        <Button variant="danger">Delete</Button>
                    </span>
                    <span className="ml-3 relative shadow-sm rounded-md">
                        <Button>Edit</Button>
                    </span>
                </div>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                <Card>
                    <CardContent>
                        <dl>
                            <dt className="text-sm leading-5 font-medium text-gray-500 truncate">
                                Monthly Cost
                            </dt>
                            <dd className="mt-1 text-3xl leading-9 font-semibold text-gray-900">
                                $
                                {calculateMonthlyCost(
                                    data.application.component.containerGroup.size,
                                    data.application.component.containerGroup.containerCount,
                                )}
                            </dd>
                        </dl>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <dl>
                            <dt className="text-sm leading-5 font-medium text-gray-500 truncate">
                                Instance Size
                            </dt>
                            <dd className="mt-1 text-3xl leading-9 font-semibold text-gray-900">
                                {data.application.component.containerGroup.size}
                            </dd>
                        </dl>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <dl>
                            <dt className="text-sm leading-5 font-medium text-gray-500 truncate">
                                Instance Count
                            </dt>
                            <dd className="mt-1 text-3xl leading-9 font-semibold text-gray-900">
                                {data.application.component.containerGroup.containerCount}
                            </dd>
                        </dl>
                    </CardContent>
                </Card>
            </div>
            <div className="mt-4">
                <Card
                    title="Secrets"
                    actions={
                        <Button variant="primary" onClick={creatingOn}>
                            Add
                        </Button>
                    }
                >
                    <Secrets
                        id={data.application.component.id}
                        secrets={data.application.component.secrets}
                    />
                </Card>
                <EditOrAddSecret
                    id={data.application.component.id}
                    open={creating}
                    onClose={creatingOff}
                    create
                />
            </div>
        </>
    );
}
