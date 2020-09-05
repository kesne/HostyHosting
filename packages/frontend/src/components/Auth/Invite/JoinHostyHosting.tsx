import React from 'react';
import Button from '../../ui/Button';
import { useNavigate } from 'react-router-dom';
import { useFragment, graphql } from 'react-relay/hooks';
import { JoinHostyHosting_organizationInvitePreview$key } from './__generated__/JoinHostyHosting_organizationInvitePreview.graphql';

type Props = {
    preview: JoinHostyHosting_organizationInvitePreview$key;
};

export default function JoinHostyHosting({ preview }: Props) {
    const navigate = useNavigate();

    const data = useFragment(
        graphql`
            fragment JoinHostyHosting_organizationInvitePreview on OrganizationInvitePreview {
                name
                email
            }
        `,
        preview,
    );

    return (
        <div>
            <p className="mb-4">
                To join this organization, you must first create a HostyHosting account.
            </p>

            <Button
                fullWidth
                variant="primary"
                onClick={() =>
                    navigate('/auth/sign-up', {
                        state: {
                            name: data.name,
                            email: data.email,
                        },
                    })
                }
            >
                Create Account
            </Button>
        </div>
    );
}
