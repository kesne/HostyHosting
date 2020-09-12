import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import useBoolean from '../../utils/useBoolean';
import Modal, { ModalContent, ModalFooter } from '../ui/Modal';
import Button, { ButtonGroup } from '../ui/Button';
import IconButton from '../ui/IconButton';
import { useFragment, graphql, useMutation } from 'react-relay/hooks';
import { RemoveMembership_organizationMembership$key } from './__generated__/RemoveMembership_organizationMembership.graphql';
import { RemoveMembershipMutation } from './__generated__/RemoveMembershipMutation.graphql';
import Form from '../forms/Form';
import SubmitButton from '../forms/SubmitButton';

type Props = {
    membership: RemoveMembership_organizationMembership$key;
    children?: React.ReactNode;
};

// TODO:
// - Don't allow removing yourself in this UI
// - Actually wire this up to the mutation.
// - Update relay and use the annotations to potentially avoid updater functions.
// - Style the delete icon better.
// - Figure out if admins can remove admins. I've been saying that they can, but this is kind of tricky.
export default function RemoveMembership({ membership, children }: Props) {
    const [open, { on, off }] = useBoolean(false);

    const data = useFragment(
        graphql`
            fragment RemoveMembership_organizationMembership on OrganizationMembership {
                id
                user {
                    id
                    name
                }
            }
        `,
        membership,
    );

    const [mutate, isInFlight] = useMutation<RemoveMembershipMutation>(graphql`
        mutation RemoveMembershipMutation($input: DeleteOrganizationMembershipInput!) {
            deleteOrganizationMembership(input: $input) {
                id @deleteRecord
            }
        }
    `);

    function onSubmit() {
        mutate({
            variables: {
                input: {
                    id: data.id,
                },
            },
            onCompleted() {
                off();
            },
        });
    }

    return (
        <>
            <div onClick={on}>
                {children ?? (
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                )}
            </div>
            <Modal open={open} onClose={off}>
                <Form onSubmit={onSubmit} disabled={isInFlight}>
                    <ModalContent title={`Remove "${data.user.name}" From Organization`}>
                        Are you sure you want to remove this user from the organization?
                    </ModalContent>
                    <ModalFooter>
                        <ButtonGroup>
                            <Button onClick={off}>Cancel</Button>
                            <SubmitButton variant="danger">Remove</SubmitButton>
                        </ButtonGroup>
                    </ModalFooter>
                </Form>
            </Modal>
        </>
    );
}
