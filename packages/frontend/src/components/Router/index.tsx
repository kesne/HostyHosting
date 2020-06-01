import React from 'react';
import PageHeader from '../ui/PageHeader';
import Title from '../ui/Title';
import Container from '../ui/Container';
import Card from '../ui/Card';
import { useLazyLoadQuery, graphql } from 'react-relay/hooks';
import { useParams } from 'react-router';
import { RouterQuery } from './__generated__/RouterQuery.graphql';
import { Crumb, Header } from '../Crumbs';
import Pagination, { usePagination } from '../ui/Pagination';
import List, { ListItem } from '../ui/List';
import CreateRouterRule from './CreateRouterRule';

export default function Router() {
    const params = useParams();
    const [paginationArgs, paginationProps] = usePagination(10);
    const data = useLazyLoadQuery<RouterQuery>(
        graphql`
            query RouterQuery($router: ID!, $limit: Int!, $offset: Int) {
                router(id: $router) {
                    id
                    label
                    organization {
                        id
                        name
                        username
                    }
                    rules(limit: $limit, offset: $offset) {
                        pageInfo {
                            hasNextPage
                            hasPreviousPage
                        }
                        edges {
                            node {
                                domain
                                pathPrefix
                                forwardPathPrefix
                                component {
                                    id
                                }
                                environment {
                                    id
                                }
                            }
                        }
                    }
                }
            }
        `,
        {
            router: params.router,
            ...paginationArgs,
        },
    );

    return (
        <Crumb
            url={`/orgs/${data.router.organization.username}`}
            name={data.router.organization.name}
        >
            <Crumb url="." name={data.router.label}>
                <PageHeader>
                    <Header />
                </PageHeader>

                <Container className="my-6">
                    <Card title="Rules">
                        <List connection={data.router.rules}>
                            {() => <ListItem>Rule here</ListItem>}
                        </List>
                        <Pagination pageInfo={data.router.rules.pageInfo} {...paginationProps} />
                    </Card>
                </Container>
                <CreateRouterRule />
            </Crumb>
        </Crumb>
    );
}
