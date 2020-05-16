import React from 'react';
import Card, { CardContent } from '../../../ui/Card';
import formatCurrency from '../../../../utils/formatCurrency';
import Button from '../../../ui/Button';
import Secrets from './Secrets';
import useBoolean from '../../../../utils/useBoolean';
import CreateContainerGroup from './CreateContainerGroup';
import { useLazyLoadQuery, graphql } from 'react-relay/hooks';
import { ContainerGroupQuery } from './__generated__/ContainerGroupQuery.graphql';

type Props = {
    component: string;
    environment: string;
};

export default function ContainerGroup({ component, environment }: Props) {
    const data = useLazyLoadQuery<ContainerGroupQuery>(
        graphql`
            query ContainerGroupQuery($component: ID!, $environment: ID!) {
                component(id: $component) {
                    id
                    containerGroup(environment: $environment) {
                        id
                        monthlyPrice
                        containerCount
                        size
                        ...Secrets_containerGroup
                    }
                }
            }
        `,
        {
            component,
            environment,
        },
    );

    const [creating, { on: creatingOn, off: creatingOff }] = useBoolean(false);

    const { containerGroup } = data.component;

    return (
        <>
            {containerGroup ? (
                <>
                    <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                        <Card>
                            <CardContent>
                                <dl>
                                    <dt className="text-sm leading-5 font-medium text-gray-500 truncate">
                                        Monthly Cost
                                    </dt>
                                    <dd className="mt-1 text-3xl leading-9 font-semibold text-gray-900">
                                        {formatCurrency(containerGroup.monthlyPrice)}
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
                                        {containerGroup.size}
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
                                        {containerGroup.containerCount}
                                    </dd>
                                </dl>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="mt-4">
                        <Secrets id={containerGroup.id} containerGroup={containerGroup} />
                    </div>
                </>
            ) : (
                <div className="mt-6 flex flex-col items-center">
                    <p className="mb-4 text-base font-medium text-gray-600">
                        This component is not deployed into this environment.
                    </p>
                    <Button variant="primary" onClick={creatingOn}>
                        Deploy to this environment
                    </Button>
                </div>
            )}
            <CreateContainerGroup
                component={component}
                environment={environment}
                open={creating}
                onClose={creatingOff}
            />
        </>
    );
}
