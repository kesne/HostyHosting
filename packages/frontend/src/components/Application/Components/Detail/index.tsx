import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useComponentQuery } from '../../../../queries';
import Card, { CardContent } from '../../../ui/Card';
import formatDate from '../../../../utils/formatDate';
import Button from '../../../ui/Button';
import { useBreadcrumb } from '../../Breadcrumbs';
import useBoolean from '../../../../utils/useBoolean';
import formatCurrency from '../../../../utils/formatCurrency';
import EditComponent from './EditComponent';
import DeleteComponent from './DeleteComponent';
import Tabs from '../../../ui/Tabs';
import ContainerGroup from './ContainerGroup';

export default function Detail() {
    const params = useParams<{ application: string; component: string }>();
    const { data } = useComponentQuery({
        variables: {
            app: Number(params.application),
            component: Number(params.component),
        },
    });
    const [environment, setEnvironment] = useState('');
    const [editing, { on: editingOn, off: editingOff }] = useBoolean(false);

    useEffect(() => {
        if (data) {
            setEnvironment(String(data.application.environments[0].id));
        }
    }, [data]);

    useBreadcrumb({
        name: data?.application.component.name || '...',
        url: `/applications/${params.application}/components/${params.component}`,
        // TODO: I think we really should do this with a component instead of with a hook like this.
        // This hook means things like conditional rendering are pretty hard, and it also means we need to call it
        // before any conditional return. So we should just have a <BreadcrumbActions> component
        // that can deal with the portal nonsense. Also this should probably just be a portal.
        actions: (
            <>
                <span className="ml-3 relative shadow-sm rounded-md">
                    <DeleteComponent id={data?.application.component.id} />
                </span>
                <span className="ml-3 relative shadow-sm rounded-md">
                    <Button onClick={editingOn}>Edit</Button>
                    {/* <EditComponent
                            component={data.application.component}
                            visible={editing}
                            onClose={editingOff}
                        /> */}
                </span>
            </>
        ),
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
                        {/* <div className="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mr-6">
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
                        </div> */}
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
                        <DeleteComponent id={data.application.component.id} />
                    </span>
                    <span className="ml-3 relative shadow-sm rounded-md">
                        <Button onClick={editingOn}>Edit</Button>
                        {/* <EditComponent
                            component={data.application.component}
                            visible={editing}
                            onClose={editingOff}
                        /> */}
                    </span>
                </div>
            </div>
            <Tabs
                value={environment}
                onChange={setEnvironment}
                tabs={data.application.environments.map(({ id, label }) => ({
                    label,
                    value: String(id),
                }))}
            />
            {environment && (
                <ContainerGroup
                    component={data.application.component.id}
                    environment={Number(environment)}
                />
            )}
        </>
    );
}
