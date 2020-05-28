import React from 'react';
import { graphql, useRefetchableFragment } from 'react-relay/hooks';
import List, { ListItem } from '../../ui/List';
import Button from '../../ui/Button';
import { ApplicationsListFragment_organization$key } from './__generated__/ApplicationsListFragment_organization.graphql';
import { ApplicationsListQuery } from './__generated__/ApplicationsListQuery.graphql';

type Props = {
    organization: ApplicationsListFragment_organization$key;
};

export default function ApplicationsList({ organization }: Props) {
    const [data, refetch] = useRefetchableFragment<
        ApplicationsListQuery,
        ApplicationsListFragment_organization$key
    >(
        graphql`
            fragment ApplicationsListFragment_organization on Organization
                @refetchable(queryName: "ApplicationsListQuery") {
                username
                applications(after: $cursor, first: $count) {
                    pageInfo {
                        endCursor
                        hasNextPage
                    }
                    edges {
                        cursor
                        node {
                            id
                            name
                            label
                            description
                        }
                    }
                }
            }
        `,
        organization,
    );

    return (
        <>
            <div className="flex-1 flex flex-col">
                <List connection={data.applications}>
                    {application => (
                        <ListItem
                            key={application.id}
                            to={`/orgs/${data.username}/apps/${application.name}`}
                        >
                            <div className="flex">
                                <div className="text-gray-900 text-base mr-2">
                                    {application.label}
                                </div>
                                <div className="text-gray-400 text-base">({application.name})</div>
                            </div>
                            {application.description && (
                                <div className="text-sm text-gray-500 mt-2">
                                    {application.description}
                                </div>
                            )}
                        </ListItem>
                    )}
                </List>
            </div>
            <div className="border-t border-gray-200 p-4 flex justify-end space-x-4">
                <Button>Previous</Button>
                <Button
                    onClick={() => {
                        refetch({ cursor: data.applications.pageInfo.endCursor });
                    }}
                >
                    Next
                </Button>
            </div>
        </>
    );
}
