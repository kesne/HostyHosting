import React from 'react';
import { useMutation, graphql } from 'react-relay/hooks';
import { CreateEnvironmentMutation } from './__generated__/CreateEnvironmentMutation.graphql';
import Modal, { ModalFooter, ModalContent } from '../ui/Modal';
import Input from '../forms/Input';
import Form from '../forms/Form';
import Button, { ButtonGroup } from '../ui/Button';
import SubmitButton from '../forms/SubmitButton';

type Props = {
    organization?: string;
    open: boolean;
    onClose(): void;
};

export default function CreateEnvironment({ organization, open, onClose }: Props) {
    const [commit, isInFlight] = useMutation<CreateEnvironmentMutation>(graphql`
        mutation CreateEnvironmentMutation($input: CreateEnvironmentInput!) {
            createEnvironment(input: $input) {
                id
                name
                label
            }
        }
    `);

    function onCreate(values: Record<string, string>) {
        commit({
            variables: {
                input: {
                    organizationID: organization,
                    label: values.label,
                    name: values.name,
                },
            },
            updater(store) {
                const newNode = store.getRootField('createEnvironment');

                const organizationProxy = store.get(organization!);
                const newNodes = [...organizationProxy!.getLinkedRecords('environments'), newNode];
                organizationProxy!.setLinkedRecords(newNodes, 'environments');
            },
            onCompleted() {
                onClose();
            },
        });
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Form onSubmit={onCreate} disabled={isInFlight}>
                <ModalContent title="Create Environment">
                    <div className="space-y-6">
                        <Input label="Name" name="name" register={{ required: true }} />
                        <Input label="Label" name="label" register={{ required: true }} />
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
