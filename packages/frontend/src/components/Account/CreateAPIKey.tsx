import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal, { ModalContent, ModalFooter } from '../ui/Modal';
import Button, { ButtonGroup } from '../ui/Button';
import Input from '../ui/Input';
import { useMutation, graphql } from 'react-relay/hooks';
import { CreateAPIKeyMutation } from './__generated__/CreateAPIKeyMutation.graphql';
import { ConnectionHandler } from 'relay-runtime';

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
    const { register, errors, handleSubmit, reset } = useForm();

    const [commit, isInFlight] = useMutation<CreateAPIKeyMutation>(graphql`
        mutation CreateAPIKeyMutation($description: String!) {
            createAPIKey(description: $description) {
                node {
                    id
                    description
                    createdAt
                    privateKeys
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
            updater(store) {
                const meRecord = store.get(id)!;

                const connectionRecord = ConnectionHandler.getConnection(
                    meRecord,
                    'APIKeys_apiKeys',
                )!;

                const newAPIKeyRecord = store
                    .getRootField('createAPIKey')!
                    .getLinkedRecord('node')!;

                const newEdge = ConnectionHandler.createEdge(
                    store,
                    connectionRecord,
                    newAPIKeyRecord,
                    'APIKeyEdge',
                );

                ConnectionHandler.insertEdgeBefore(connectionRecord, newEdge);
            },
        });
    }

    useEffect(() => {
        if (open) {
            reset();
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalContent title="Create API Key">
                        <p className="text-gray-800 text-sm font-normal mb-4">
                            API Keys grant external access to HostyHosting through the CLI.
                        </p>
                        <Input
                            label="Description"
                            name="description"
                            ref={register({ required: true })}
                            errors={errors}
                            disabled={isInFlight}
                        />
                    </ModalContent>
                    <ModalFooter>
                        <ButtonGroup>
                            <Button type="submit" variant="primary" disabled={isInFlight}>
                                Create
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ButtonGroup>
                    </ModalFooter>
                </form>
            )}
        </Modal>
    );
}
