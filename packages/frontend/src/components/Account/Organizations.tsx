import React from 'react';
import Card from '../ui/Card';
import { useLazyLoadQuery, graphql } from 'react-relay/hooks';
import { OrganizationsQuery } from './__generated__/OrganizationsQuery.graphql';

export default function Organizations() {
    const data = useLazyLoadQuery<OrganizationsQuery>(
        graphql`
            query OrganizationsQuery($limit: Int!, $offset: Int!) {
                viewer {
                    id
                    organizations(limit: $limit, offset: $offset) {
                        pageInfo {
                            startCursor
                            endCursor
                            hasPreviousPage
                            hasNextPage
                        }
                        edges {
                            cursor
                            node {
                                id
                            }
                        }
                    }
                }
            }
        `,
        {
            limit: 10,
            offset: 0,
        },
    );

    console.log(data);

    return (
        <Card title="Manage Organizations">
            Hi
            {/* <List items={data.viewer.apiKeys.edges}>
                {({ node: apiKey }) => (
                    <ListItem key={apiKey.id}>
                        <div className="flex justify-between">
                            <div>{apiKey.description}</div>
                            <div>
                                {new Date(apiKey.createdAt).toLocaleString()}
                                <Button variant="danger" onClick={handleDelete(apiKey.id)}>
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </ListItem>
                )}
            </List> */}
        </Card>
    );
}
