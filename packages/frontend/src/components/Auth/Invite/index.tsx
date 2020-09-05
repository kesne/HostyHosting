import React from 'react';
import Container from '../Container';
import { useHasUser } from '../../../utils/user';
import JoinOrganization from './JoinOrganization';
import JoinHostyHosting from './JoinHostyHosting';
import { useLazyLoadQuery, graphql } from 'react-relay/hooks';
import { useParams } from 'react-router-dom';
import { InviteQuery } from './__generated__/InviteQuery.graphql';

export default function Invite() {
    const params = useParams();
    const hasUser = useHasUser();

    const data = useLazyLoadQuery<InviteQuery>(
        graphql`
            query InviteQuery($id: ID!) {
                organizationInvitePreview(id: $id) {
                    organizationName
                    ...JoinHostyHosting_organizationInvitePreview
                    ...JoinOrganization_organizationInvitePreview
                }
            }
        `,
        {
            id: params.uuid,
        },
    );

    return (
        <Container title={`Join Organization "${data.organizationInvitePreview.organizationName}"`}>
            {hasUser ? <JoinOrganization preview={data.organizationInvitePreview} /> : <JoinHostyHosting preview={data.organizationInvitePreview} />}
        </Container>
    );
}
