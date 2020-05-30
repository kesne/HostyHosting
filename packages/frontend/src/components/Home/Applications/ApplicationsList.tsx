import React, { unstable_useTransition } from 'react';
import { graphql, useFragment } from 'react-relay/hooks';
import List, { ListItem } from '../../ui/List';
import Button from '../../ui/Button';
import { ApplicationsListFragment_organization$key } from './__generated__/ApplicationsListFragment_organization.graphql';
import Pagination from '../../ui/Pagination';

type Props = {
    organization: ApplicationsListFragment_organization$key;
    onNextPage(): void;
    onPreviousPage(): void;
};

export default function ApplicationsList({ organization, onNextPage, onPreviousPage }: Props) {
    const data = useFragment(
        graphql`
            fragment ApplicationsListFragment_organization on Organization {
                username
                applications(limit: $limit, offset: $offset) {
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
            <Pagination
                pageInfo={data.applications.pageInfo}
                onNextPage={onNextPage}
                onPreviousPage={onPreviousPage}
            />
        </>
    );
}
