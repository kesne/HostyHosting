import React, { useEffect, useState } from 'react';
import { ConnectionHandler } from 'relay-runtime';
import { useMutation, graphql } from 'react-relay/hooks';
import Modal, { ModalContent, ModalFooter } from '../ui/Modal';
import Button, { ButtonGroup } from '../ui/Button';
import { CreateAPIKeyMutation } from './__generated__/CreateAPIKeyMutation.graphql';
import Form from '../forms/Form';
import Input from '../forms/Input';
import SubmitButton from '../forms/SubmitButton';

export default function CreateAPIKey({
    id,
    open,
    onClose,
}: {
    id: string;
    open: boolean;
    onClose(): void;
}) {
    const [privateKey, setPrivateKey] = useState('');

    const [commit, isInFlight] = useMutation<CreateAPIKeyMutation>(graphql`
        mutation CreateAPIKeyMutation($description: String!) {
            createAPIKey(description: $description) {
                node {
                    id
                    description
                    createdAt
                    privateKey
                }
            }
        }
    `);

    function onSubmit(values: Record<string, string>) {
        commit({
            variables: {
                description: values.description,
            },
            onCompleted(data) {
                setPrivateKey(data.createAPIKey.node.privateKey!);
            },
            // TODO: Write updater
            updater(store) {
            },
        });
    }

    useEffect(() => {
        if (open) {
            setPrivateKey('');
        }
    }, [open]);

    return (
        <Modal open={open} onClose={onClose}>
            {privateKey ? (
                <>
                    <ModalContent title="Create API Key">
                        <p className="text-gray-800 text-sm font-normal">
                            Copy this API Key and keep it somewhere save. You{' '}
                            <strong>will not</strong> be able to retrieve it in the future.
                        </p>
                        <div className="px-2 py-1 border border-gray-200 bg-gray-100 font-mono leading-tight rounded break-all my-4">
                            {privateKey}
                        </div>
                        <p className="text-gray-800 text-sm font-normal">
                            You can also use this API Key to sign into the HostingHosting CLI
                            directly.
                        </p>
                        <div className="px-2 py-1 border border-gray-200 bg-gray-100 font-mono leading-tight rounded break-all my-4">
                            <strong>hh login</strong> {privateKey}
                        </div>
                    </ModalContent>
                    <ModalFooter>
                        <ButtonGroup>
                            <Button onClick={onClose}>Close</Button>
                        </ButtonGroup>
                    </ModalFooter>
                </>
            ) : (
                <Form onSubmit={onSubmit} disabled={isInFlight}>
                    <ModalContent title="Create API Key">
                        <p className="text-gray-800 text-sm font-normal mb-4">
                            API Keys grant external access to HostyHosting through the CLI.
                        </p>
                        <Input
                            label="Description"
                            name="description"
                            register={{ required: true }}
                        />
                    </ModalContent>
                    <ModalFooter>
                        <ButtonGroup>
                            <SubmitButton>Create</SubmitButton>
                            <Button onClick={onClose}>Cancel</Button>
                        </ButtonGroup>
                    </ModalFooter>
                </Form>
            )}
        </Modal>
    );
}
