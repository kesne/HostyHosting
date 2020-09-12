import React from 'react';
import Card from '../ui/Card';
import { useLazyLoadQuery, graphql } from 'react-relay/hooks';
import { OrganizationsQuery } from './__generated__/OrganizationsQuery.graphql';
import List, { ListItem } from '../ui/List';
import Button from '../ui/Button';
import RemoveMembership from '../shared/RemoveMembership';

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
                                permission
                                organization {
                                    id
                                    name
                                }
                                ...RemoveMembership_organizationMembership
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

    return (
        <Card title="Manage Organizations">
            <List connection={data.viewer.organizations}>
                {membership => (
                    <ListItem key={membership.id}>
                        <div className="flex justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="text-sm leading-5 font-medium text-gray-900 truncate">
                                    {membership.organization.name}
                                </div>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 bg-gray-100 text-gray-800">
                                    {membership.permission}
                                </span>
                            </div>
                            <div>
                                <RemoveMembership membership={membership}>
                                    <Button variant="danger">Leave Organization</Button>
                                </RemoveMembership>
                            </div>
                        </div>
                    </ListItem>
                )}
            </List>
        </Card>
    );
}
