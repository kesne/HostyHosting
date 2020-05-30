import React from 'react';
import { useLazyLoadQuery, graphql } from 'react-relay/hooks';
import Component from './Component';
import CreateComponent from './CreateComponent';
import useBoolean from '../../../../utils/useBoolean';
import { useApplicationParams } from '../../ApplicationContext';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';
import List from '../../../ui/List';
import { ListQuery } from './__generated__/ListQuery.graphql';
import Pagination, { usePagination } from '../../../ui/Pagination';

export default function Components() {
    const params = useApplicationParams();
    const [paginationArgs, paginationProps] = usePagination(10);

    const data = useLazyLoadQuery<ListQuery>(
        graphql`
            query ListQuery($application: ID!, $limit: Int!, $offset: Int!) {
                application(id: $application) {
                    id
                    components(limit: $limit, offset: $offset) {
                        pageInfo {
                            hasNextPage
                            hasPreviousPage
                        }
                        edges {
                            node {
                                ...Component_component
                            }
                        }
                    }
                }
            }
        `,
        {
            application: params.application,
            ...paginationArgs,
        },
    );

    const [createVisible, { on, off }] = useBoolean(false);

    const { application } = data;

    return (
        <Card
            title="Components"
            actions={
                <Button variant="primary" onClick={on}>
                    Create Component
                </Button>
            }
        >
            <CreateComponent visible={createVisible} onClose={off} />
            <List connection={application.components}>
                {component => <Component component={component} />}
            </List>

            <Pagination pageInfo={application.components.pageInfo} {...paginationProps} />
        </Card>
    );
}
