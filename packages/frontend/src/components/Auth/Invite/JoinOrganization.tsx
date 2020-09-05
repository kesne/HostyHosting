import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFragment, graphql, useMutation } from 'react-relay/hooks';
import Button from '../../ui/Button';
import { JoinOrganization_organizationInvitePreview$key } from './__generated__/JoinOrganization_organizationInvitePreview.graphql';
import { JoinOrganizationMutation } from './__generated__/JoinOrganizationMutation.graphql';

type Props = {
    preview: JoinOrganization_organizationInvitePreview$key;
};

export default function JoinOrganization({ preview }: Props) {
    const params = useParams();
    const navigate = useNavigate();

    const [commit, isInFlight] = useMutation<JoinOrganizationMutation>(graphql`
        mutation JoinOrganizationMutation($id: ID!) {
            acceptInvite(id: $id) {
                id
                username
            }
        }
    `);

    const data = useFragment(
        graphql`
            fragment JoinOrganization_organizationInvitePreview on OrganizationInvitePreview {
                permission
            }
        `,
        preview,
    );

    function acceptInvite() {
        commit({
            variables: {
                id: params.uuid,
            },
            onCompleted(data) {
                navigate(`/orgs/${data.acceptInvite.username}`);
            },
        });
    }

    return (
        <div>
            <p className="mb-4">
                Joining this organization will give you{' '}
                <span className="font-mono font-semibold">{data.permission}</span> permission to
                their projects.
            </p>
            <Button variant="primary" disabled={isInFlight} onClick={acceptInvite} fullWidth>
                Join Organization
            </Button>
        </div>
    );
}
