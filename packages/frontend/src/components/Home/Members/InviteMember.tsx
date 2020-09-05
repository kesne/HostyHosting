import React from 'react';
import Modal, { ModalContent, ModalFooter } from '../../ui/Modal';
import Form from '../../forms/Form';
import Input from '../../forms/Input';
import Button, { ButtonGroup } from '../../ui/Button';
import SubmitButton from '../../forms/SubmitButton';
import Select from '../../forms/Select';
import { useFragment, graphql, useMutation } from 'react-relay/hooks';
import { InviteMember_organization$key } from './__generated__/InviteMember_organization.graphql';
import { InviteMemberMutation } from './__generated__/InviteMemberMutation.graphql';
import { OrganizationPermission } from './__generated__/MembersQuery.graphql';

type Props = {
    open: boolean;
    onClose(): void;
    organization: InviteMember_organization$key;
};

export default function InviteMember({ open, onClose, organization }: Props) {
    const data = useFragment(
        graphql`
            fragment InviteMember_organization on Organization {
                id
                membership {
                    id
                    permission
                }
            }
        `,
        organization,
    );

    const [commit, isInFlight] = useMutation<InviteMemberMutation>(graphql`
        mutation InviteMemberMutation($input: InviteToOrganizationInput!) {
            inviteToOrganization(input: $input) {
                ok
            }
        }
    `);

    function onCreate(values: Record<string, string>) {
        commit({
            variables: {
                input: {
                    organizationID: data.id,
                    name: values.name,
                    email: values.email,
                    permission: values.permission as OrganizationPermission,
                },
            },
            onCompleted() {
                onClose();
            },
        });
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Form onSubmit={onCreate} disabled={isInFlight}>
                <ModalContent title="Invite Member">
                    <div className="space-y-6">
                        <p>
                            Invite a new member to your organiation. Members can view all of your
                            organization's applications, environments, and deployments.
                        </p>
                        <p>
                            Invited members are required to accept an invitation sent via email to
                            join the organization.
                        </p>
                        <Input label="Invited Name" name="name" register={{ required: true }} />
                        <Input label="Email Address" name="email" register={{ required: true }} />
                        <Select label="Permission" name="permission" register={{ required: true }}>
                            <option value="READ">Read</option>
                            <option
                                value="WRITE"
                                disabled={!['WRITE', 'ADMIN'].includes(data.membership.permission)}
                            >
                                Write
                            </option>
                            <option
                                value="ADMIN"
                                disabled={!['ADMIN'].includes(data.membership.permission)}
                            >
                                Admin
                            </option>
                        </Select>
                    </div>
                </ModalContent>
                <ModalFooter>
                    <ButtonGroup>
                        <Button onClick={onClose}>Cancel</Button>
                        <SubmitButton>Invite</SubmitButton>
                    </ButtonGroup>
                </ModalFooter>
            </Form>
        </Modal>
    );
}
