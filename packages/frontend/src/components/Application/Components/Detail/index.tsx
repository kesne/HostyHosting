import React, { useState, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import formatDate from '../../../../utils/formatDate';
import Button from '../../../ui/Button';
import useBoolean from '../../../../utils/useBoolean';
import Tabs from '../../../ui/Tabs';
import ContainerGroup from './ContainerGroup';
import { useApplicationParams } from '../../ApplicationContext';
import { useLazyLoadQuery, graphql } from 'react-relay/hooks';
import { DetailComponentQuery } from './__generated__/DetailComponentQuery.graphql';
import DeleteComponent from './DeleteComponent';
import { Crumb, CrumbActions, CrumbSubtitle } from '../../../Crumbs';
import Badge from '../../../ui/Badge';
import ContainerGroupLoading from './ContainerGroupLoading';

export default function Detail() {
    const params = useParams();
    const applicationParams = useApplicationParams();
    const data = useLazyLoadQuery<DetailComponentQuery>(
        graphql`
            query DetailComponentQuery($application: ID!, $component: ID!) {
                application(id: $application) {
                    id
                    environments {
                        id
                        name
                        label
                    }
                    component(id: $component) {
                        id
                        name
                        label
                        createdAt
                        updatedAt
                        deploymentStrategy
                    }
                }
            }
        `,
        {
            application: applicationParams.application,
            component: params.component,
        },
    );

    const [environment, setEnvironment] = useState(data.application.environments[0].id);
    const [editing, { on: editingOn, off: editingOff }] = useBoolean(false);

    const { application } = data;
    const { component } = application;

    return (
        <Crumb name={component.label} url={params.component}>
            <CrumbSubtitle>
                <div className="flex items-center space-y-3 sm:space-y-0 sm:space-x-6 flex-col sm:flex-row sm:flex-wrap">
                    <Badge label={component.name} />
                    <div className="flex items-center text-sm leading-5 text-gray-500">
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
                        {component.deploymentStrategy}
                    </div>
                    <div className="flex items-center text-sm leading-5 text-gray-500">
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
                        Created on {formatDate(component.createdAt)}, last updated{' '}
                        {formatDate(component.updatedAt)}
                    </div>
                </div>
            </CrumbSubtitle>
            <CrumbActions>
                <span className="ml-3 relative shadow-sm rounded-md">
                    <DeleteComponent id={data.application.component.id} />
                </span>
                <span className="ml-3 relative shadow-sm rounded-md">
                    <Button onClick={editingOn}>Edit</Button>
                    {/* <EditComponent
                                    component={component}
                                    visible={editing}
                                    onClose={editingOff}
                                /> */}
                </span>
            </CrumbActions>
            <Tabs
                value={environment}
                onChange={setEnvironment}
                tabs={application.environments.map(({ id, label }) => ({
                    label,
                    value: String(id),
                }))}
            />
            <Suspense fallback={<ContainerGroupLoading />}>
                <ContainerGroup component={component.id} environment={environment} />
            </Suspense>
        </Crumb>
    );
}
