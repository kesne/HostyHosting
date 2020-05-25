import React from 'react';
import { useMutation, graphql } from 'react-relay/hooks';
import Modal, { ModalFooter, ModalContent } from '../ui/Modal';
import Input from '../forms/Input';
import Form from '../forms/Form';
import Button, { ButtonGroup } from '../ui/Button';
import SubmitButton from '../forms/SubmitButton';

type Props = {
    organization: string;
    open: boolean;
    onClose(): void;
};

export default function CreateRouter({ organization, open, onClose }: Props) {
    const [commit, isInFlight] = useMutation(graphql`
        mutation CreateRouterMutation($input: CreateRouterInput!) {
            createRouter(input: $input) {
                id
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
                },
            },
            updater(store) {
                const newNode = store.getRootField('createRouter');

                const organizationProxy = store.get(organization!);
                const newNodes = [...organizationProxy!.getLinkedRecords('routers'), newNode];
                organizationProxy!.setLinkedRecords(newNodes, 'routers');
            },
            onCompleted() {
                onClose();
            },
        });
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Form onSubmit={onCreate} disabled={isInFlight}>
                <ModalContent title="Create Router">
                    <div className="space-y-6">
                        <Input
                            label="Label"
                            name="label"
                            register={{ required: true }}
                            autoComplete="off"
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
