import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import useBoolean from '../../../utils/useBoolean';
import Modal, { ModalContent, ModalFooter } from '../../ui/Modal';
import Button, { ButtonGroup } from '../../ui/Button';
import IconButton from '../../ui/IconButton';
import { useFragment, graphql, useMutation } from 'react-relay/hooks';
import { EditMembership_organizationMembership$key } from './__generated__/EditMembership_organizationMembership.graphql';
import Select from '../../forms/Select';
import SubmitButton from '../../forms/SubmitButton';
import Form from '../../forms/Form';
import {
    EditMembershipMutation,
    OrganizationPermission,
} from './__generated__/EditMembershipMutation.graphql';

type Props = {
    membership: EditMembership_organizationMembership$key;
};

export default function EditMembership({ membership }: Props) {
    const [open, { on, off }] = useBoolean(false);

    const data = useFragment(
        graphql`
            fragment EditMembership_organizationMembership on OrganizationMembership {
                id
                permission
                user {
                    id
                    name
                }
            }
        `,
        membership,
    );

    const [mutate, isInFlight] = useMutation<EditMembershipMutation>(graphql`
        mutation EditMembershipMutation($input: UpdateOrganizationMembershipInput!) {
            updateOrganizationMembership(input: $input) {
                id
                permission
            }
        }
    `);

    function onSubmit(values: Record<string, string>) {
        mutate({
            variables: {
                input: {
                    id: data.id,
                    permission: values.permission as OrganizationPermission,
                },
            },
            onCompleted() {
                off();
            },
        });
    }

    return (
        <>
            <IconButton onClick={on}>
                <EditIcon />
            </IconButton>
            <Modal open={open} onClose={off}>
                <Form
                    defaultValues={{ permission: data.permission }}
                    onSubmit={onSubmit}
                    disabled={isInFlight}
                >
                    <ModalContent title={`Edit Membership For "${data.user.name}"`}>
                        <p className="text-gray-800 font-normal mb-2">
                            You may modify the permission level for this user.
                        </p>
                        <Select label="Permission" name="permission">
                            <option value="READ">Read</option>
                            <option value="WRITE">Write</option>
                            <option value="ADMIN">Admin</option>
                        </Select>
                    </ModalContent>
                    <ModalFooter>
                        <ButtonGroup>
                            <Button onClick={off}>Cancel</Button>
                            <SubmitButton>Modify</SubmitButton>
                        </ButtonGroup>
                    </ModalFooter>
                </Form>
            </Modal>
        </>
    );
}
