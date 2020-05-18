import React from 'react';
import { useApplicationParams } from '../../../ApplicationContext';
import { useMutation, graphql } from 'react-relay/hooks';
import { EditOrAddSecretEditMutation } from './__generated__/EditOrAddSecretEditMutation.graphql';
import { EditOrAddSecretAddMutation } from './__generated__/EditOrAddSecretAddMutation.graphql';
import Modal, { ModalContent, ModalFooter } from '../../../../ui/Modal';
import Input from '../../../../forms/Input';
import Form from '../../../../forms/Form';
import Button, { ButtonGroup } from '../../../../ui/Button';
import SubmitButton from '../../../../forms/SubmitButton';

export type SecretEdit = {
    id: string;
    key: string;
    value: string;
};

type Props = {
    id: string;
    open: boolean;
    onClose(): void;
    secret?: SecretEdit;
};

export default function EditOrAddSecret({ id, secret, open, onClose }: Props) {
    const params = useApplicationParams();

    const [commitEdit, editIsInFlight] = useMutation<EditOrAddSecretEditMutation>(graphql`
        mutation EditOrAddSecretEditMutation($input: EditSecretInput!) {
            editSecret(input: $input) {
                id
                key
                value
            }
        }
    `);

    const [commitCreate, addIsInFlight] = useMutation<EditOrAddSecretAddMutation>(graphql`
        mutation EditOrAddSecretAddMutation($input: CreateSecretInput!) {
            createSecret(input: $input) {
                id
                key
                value
            }
        }
    `);

    const isInFlight = editIsInFlight || addIsInFlight;

    function onSubmit(values: Record<string, string>) {
        if (!secret) {
            commitCreate({
                variables: {
                    input: {
                        containerGroupID: id,
                        key: values.key,
                        value: values.value,
                    },
                },
                onCompleted() {
                    onClose();
                },
                updater(store) {
                    const newNode = store.getRootField('createSecret');

                    const containerGroup = store.get(id)!;
                    const newNodes = [...containerGroup!.getLinkedRecords('secrets'), newNode];
                    containerGroup!.setLinkedRecords(newNodes, 'secrets');
                },
            });
        } else {
            commitEdit({
                variables: {
                    input: {
                        secretID: secret.id,
                        key: values.key,
                        value: values.value,
                    },
                },
                onCompleted() {
                    onClose();
                },
            });
        }

        onClose();
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Form onSubmit={onSubmit} disabled={isInFlight}>
                <ModalContent title={!!secret ? 'Create New Secret' : 'Edit Secret'}>
                    <div className="flex-1 space-y-6">
                        <Input
                            label="Key"
                            placeholder="KEY"
                            name="key"
                            defaultValue={secret?.key}
                            register={{ required: true }}
                        />
                        <Input
                            label="Value"
                            placeholder="VALUE"
                            name="value"
                            defaultValue={secret?.value}
                            register={{ required: true }}
                        />
                    </div>
                </ModalContent>
                <ModalFooter>
                    <ButtonGroup>
                        <SubmitButton>Create</SubmitButton>
                        <Button onClick={onClose}>Cancel</Button>
                    </ButtonGroup>
                </ModalFooter>
            </Form>
        </Modal>
    );
}
