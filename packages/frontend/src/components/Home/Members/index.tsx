import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLazyLoadQuery, graphql } from 'react-relay/hooks';
import HomePage from '../HomePage';
import Button from '../../ui/Button';
import List, { ListItem } from '../../ui/List';
import useBoolean from '../../../utils/useBoolean';
import { MembersQuery } from './__generated__/MembersQuery.graphql';
import Pagination, { usePagination } from '../../ui/Pagination';
import Table, { TableRow, TableHeader, TableDataCell } from '../../ui/Table';
import formatDate from '../../../utils/formatDate';

export default function Members() {
    const params = useParams();
    const [create, { on, off }] = useBoolean(false);
    const [paginationArgs, paginationProps] = usePagination(10);
    const navigate = useNavigate();

    const data = useLazyLoadQuery<MembersQuery>(
        graphql`
            query MembersQuery($organization: String!, $limit: Int!, $offset: Int) {
                organization(username: $organization) {
                    id
                    isPersonal
                    members(limit: $limit, offset: $offset) {
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
                                createdAt
                                user {
                                    id
                                    name
                                    username
                                }
                            }
                        }
                    }
                }
            }
        `,
        {
            organization: params.organization,
            ...paginationArgs,
        },
    );

    const { organization } = data;

    // NOTE: This ensures that we don't show this UI for personal organizations:
    useEffect(() => {
        if (organization.isPersonal) {
            navigate('..');
        }
    }, [organization.isPersonal]);
    if (organization.isPersonal) {
        return null;
    }

    return (
        <>
            <HomePage
                title="Members"
                actions={
                    <Button onClick={on} variant="primary">
                        Invite Member
                    </Button>
                }
            >
                <div className="flex-1">
                    <Table
                        connection={organization.members}
                        header={
                            <>
                                <TableHeader label="Name" />
                                <TableHeader label="Username" />
                                <TableHeader label="Permission" />
                                <TableHeader label="Added" />
                            </>
                        }
                    >
                        {membership => (
                            <TableRow>
                                <TableDataCell>{membership.user.name}</TableDataCell>
                                <TableDataCell variant="secondary">
                                    {membership.user.username}
                                </TableDataCell>
                                <TableDataCell variant="secondary" className="font-mono">
                                    {membership.permission}
                                </TableDataCell>
                                <TableDataCell variant="secondary">
                                    {formatDate(membership.createdAt)}
                                </TableDataCell>
                            </TableRow>
                        )}
                    </Table>
                </div>
                <Pagination pageInfo={organization.members.pageInfo} {...paginationProps} />
            </HomePage>
            {/* <CreateEnvironment organization={organization.id} open={create} onClose={off} /> */}
        </>
    );
}
