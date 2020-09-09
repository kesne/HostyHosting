import React from 'react';
import SlideOver from '../../ui/SlideOver';
import useBoolean from '../../../utils/useBoolean';
import Button from '../../ui/Button';
import { useLazyLoadQuery, graphql } from 'react-relay/hooks';
import { useParams } from 'react-router-dom';
import Pagination, { usePagination } from '../../ui/Pagination';
import { InvitedMembersQuery } from './__generated__/InvitedMembersQuery.graphql';
import List from '../../ui/List';

export default function InvitedMembers() {
    const params = useParams();
    const [visible, { on, off }] = useBoolean(false);
    const [paginationArgs, { onNextPage, onPreviousPage }] = usePagination(10);

    const data = useLazyLoadQuery<InvitedMembersQuery>(
        graphql`
            query InvitedMembersQuery($organization: String!, $limit: Int!, $offset: Int) {
                organization(username: $organization) {
                    invites(limit: $limit, offset: $offset) {
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
                                email
                                name
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

    return (
        <>
            <Button onClick={on}>2 Invited Members</Button>
            <SlideOver title="Invited Members" visible={visible} onClose={off}>
                <ul className="divide-y divide-gray-200 overflow-y-auto">
                    <List connection={data.organization.invites}>
                        {invite => (
                            <li className="px-4 sm:px-6 py-4 relative">
                                <div className="group flex justify-between items-center space-x-2">
                                    <div className="flex-1 flex items-center min-w-0 relative">
                                        <div className="truncate">
                                            <div className="text-sm leading-5 font-medium text-gray-900 truncate">
                                                {invite.name}
                                            </div>
                                            <div className="text-sm leading-5 text-gray-500 truncate">
                                                {invite.email}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )}
                    </List>
                </ul>
                <Pagination
                    pageInfo={data.organization.invites.pageInfo}
                    onNextPage={onNextPage}
                    onPreviousPage={onPreviousPage}
                />
            </SlideOver>
        </>
    );
}
