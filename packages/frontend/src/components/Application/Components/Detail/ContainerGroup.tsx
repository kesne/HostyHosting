import React from 'react';
import Card, { CardContent } from '../../../ui/Card';
import formatCurrency from '../../../../utils/formatCurrency';
import Button from '../../../ui/Button';
import Secrets from './Secrets';
import useBoolean from '../../../../utils/useBoolean';
import CreateContainerGroup from './CreateContainerGroup';
import { useLazyLoadQuery, graphql } from 'react-relay/hooks';
import { ContainerGroupQuery } from './__generated__/ContainerGroupQuery.graphql';
import { usePagination } from '../../../ui/Pagination';
import CreateRouterRule from './CreateRouterRule';
import List, { ListItem } from '../../../ui/List';

type Props = {
    component: string;
    environment: string;
};

export default function ContainerGroup({ component, environment }: Props) {
    const [paginationArgs, { onNextPage, onPreviousPage }] = usePagination(10);

    const data = useLazyLoadQuery<ContainerGroupQuery>(
        graphql`
            query ContainerGroupQuery(
                $component: ID!
                $environment: ID!
                $limit: Int!
                $offset: Int
            ) {
                component(id: $component) {
                    id
                    application {
                        id
                    }
                    containerGroup(environment: $environment) {
                        id
                        monthlyPrice
                        containerCount
                        size
                        organization {
                            username
                        }
                        environment {
                            id
                        }
                        routerRules {
                            id
                            domain
                            pathPrefix
                            forwardPathPrefix
                        }
                        # Break this out into a separate query, or use relay helpers?:
                        ...Secrets_containerGroup @arguments(limit: $limit, offset: $offset)
                    }
                }
            }
        `,
        {
            component,
            environment,
            ...paginationArgs,
        },
    );

    const [creating, { on: creatingOn, off: creatingOff }] = useBoolean(false);
    const [
        creatingRouterRule,
        { on: creatingRouterRuleOn, off: creatingRouterRuleOff },
    ] = useBoolean(false);

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
                        <Card
                            title="Router Rules"
                            actions={
                                <Button variant="primary" onClick={creatingRouterRuleOn}>
                                    Create Router Rule
                                </Button>
                            }
                        >
                            <List items={containerGroup.routerRules}>
                                {routerRule => (
                                    <ListItem key={routerRule.id}>
                                        <div className="font-mono text-gray-900">
                                            {routerRule.domain}
                                            {routerRule.pathPrefix && (
                                                <span className="text-gray-500">
                                                    <span className="mx-1">/</span>
                                                    {routerRule.pathPrefix}
                                                </span>
                                            )}
                                        </div>
                                    </ListItem>
                                )}
                            </List>
                            <CreateRouterRule
                                containerGroup={containerGroup.id}
                                open={creatingRouterRule}
                                onClose={creatingRouterRuleOff}
                            />
                        </Card>
                    </div>
                    <div className="mt-4">
                        <Secrets
                            id={containerGroup.id}
                            containerGroup={containerGroup}
                            onNextPage={onNextPage}
                            onPreviousPage={onPreviousPage}
                        />
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
