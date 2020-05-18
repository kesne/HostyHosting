import React from 'react';
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

const updateMutation = graphql`
    mutation EditOrAddSecretEditMutation($input: UpdateSecretInput!) {
        updateSecret(input: $input) {
            id
            key
            value
        }
    }
`;

const createMutation = graphql`
    mutation EditOrAddSecretAddMutation($input: CreateSecretInput!) {
        createSecret(input: $input) {
            id
            key
            value
        }
    }
`;

export default function EditOrAddSecret({ id, secret, open, onClose }: Props) {
    const [commit, isInFlight] = useMutation<
        EditOrAddSecretEditMutation | EditOrAddSecretAddMutation
    >(secret ? updateMutation : createMutation);

    function onSubmit(values: Record<string, string>) {
        const baseInput = secret ? { secretID: secret.id } : { containerGroupID: id };

        commit({
            // @ts-ignore: TypeScript doesn't understand that we've typed BaseInput correctly
            // because this function doesn't take the secret as a generic.
            variables: {
                input: {
                    ...baseInput,
                    key: values.key,
                    value: values.value,
                },
            },
            onCompleted() {
                onClose();
            },
            updater(store) {
                if (!secret) {
                    const newNode = store.getRootField('createSecret');

                    const containerGroup = store.get(id)!;
                    const newNodes = [...containerGroup!.getLinkedRecords('secrets'), newNode];
                    containerGroup!.setLinkedRecords(newNodes, 'secrets');
                }
            },
        });
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
