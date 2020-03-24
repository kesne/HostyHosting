import React, { useEffect } from 'react';
import { useUpdateApplicationMutation, Secret } from '../../../queries';
import { useForm } from 'react-hook-form';
import Modal, { ModalContent, ModalFooter } from '@daas/ui/Modal';
import Input from '@daas/ui/Input';
import Button, { ButtonGroup } from '@daas/ui/Button';

type Props = {
    id: number;
    secret: Secret | null;
    onClose(): void;
};

export default function EditSecret({ id, secret, onClose }: Props) {
    const { register, errors, reset, handleSubmit } = useForm();
    const [updateApplication, { loading }] = useUpdateApplicationMutation();

    useEffect(() => {
        reset();
    }, [secret]);

    async function onSubmit(values: Record<string, string>) {
        await updateApplication({
            variables: {
                id,
                secret: {
                    key: values.key,
                    value: values.value
                }
            }
        });

        onClose();
    }

    return (
        <Modal open={!!secret} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ModalContent title="Edit Secret">
                    <div className="flex-1 grid grid-cols-1 row-gap-6">
                        <Input
                            label="Key"
                            placeholder="KEY"
                            name="key"
                            defaultValue={secret?.key}
                            disabled={loading}
                            ref={register({ required: true })}
                            errors={errors}
                        />
                        <Input
                            label="Value"
                            placeholder="VALUE"
                            name="value"
                            defaultValue={secret?.value}
                            disabled={loading}
                            ref={register({ required: true })}
                            errors={errors}
                        />
                    </div>
                </ModalContent>
                <ModalFooter>
                    <ButtonGroup>
                        <Button type="submit" variant="primary">
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ButtonGroup>
                </ModalFooter>
            </form>
        </Modal>
    );
}
