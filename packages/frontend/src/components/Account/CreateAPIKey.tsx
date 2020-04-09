import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Modal, { ModalContent, ModalFooter } from '../ui/Modal';
import Button, { ButtonGroup } from '../ui/Button';
import Input from '../ui/Input';
import { useCreateApiKeyMutation } from '../../queries';
import useBoolean from '../../utils/useBoolean';

export default function CreateAPIKey({ open, onClose }: { open: boolean; onClose(): void }) {
    const [submitted, { on, off }] = useBoolean(false);
    const { register, errors, handleSubmit, reset } = useForm();
    const [createAPIKey, { data }] = useCreateApiKeyMutation();

    async function onSubmit(values: Record<string, string>) {
        await createAPIKey({
            variables: {
                description: values.description,
            },
        });
        on();
    }

    useEffect(() => {
        if (open) {
            reset();
            off();
        }
    }, [open]);

    return (
        <Modal open={open} onClose={onClose}>
            {submitted ? (
                <>
                    <ModalContent title="Create API Key">
                        <p className="text-gray-800 text-sm font-normal">
                            Copy this API Key and keep it somewhere save. You{' '}
                            <strong>will not</strong> be able to retrieve it in the future.
                        </p>
                        <div className="px-2 py-1 border border-gray-200 bg-gray-100 font-mono leading-tight rounded break-all my-4">
                            {data!.createAPIKey}
                        </div>
                        <p className="text-gray-800 text-sm font-normal">
                            You can also use this API Key to sign into the HostingHosting CLI
                            directly.
                        </p>
                        <div className="px-2 py-1 border border-gray-200 bg-gray-100 font-mono leading-tight rounded break-all my-4">
                            <strong>hh login</strong> {data!.createAPIKey}
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
                        />
                    </ModalContent>
                    <ModalFooter>
                        <ButtonGroup>
                            <Button type="submit" variant="primary">
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
