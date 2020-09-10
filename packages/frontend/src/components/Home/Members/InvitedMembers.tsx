import React from 'react';
import SlideOver from '../../ui/SlideOver';
import useBoolean from '../../../utils/useBoolean';
import Button from '../../ui/Button';
import { useLazyLoadQuery, graphql } from 'react-relay/hooks';
import { useParams } from 'react-router-dom';
import Pagination, { usePagination } from '../../ui/Pagination';
import { InvitedMembersQuery } from './__generated__/InvitedMembersQuery.graphql';
import List from '../../ui/List';
import InvitedMember from './InvitedMember';

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
                                ...InvitedMember_OrganizationInvite
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
            <Button onClick={on}>View Invites</Button>
            <SlideOver title="Invited Members" visible={visible} onClose={off}>
                <ul className="divide-y divide-gray-200 overflow-y-auto">
                    <List connection={data.organization.invites}>
                        {invite => <InvitedMember key={invite.id} invite={invite} />}
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
