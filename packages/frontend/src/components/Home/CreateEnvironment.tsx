import React from 'react';
import Input from '../ui/Input';
import CreateModal from '../ui/CreateModal';
import { useCreateEnvironmentMutation } from '../../queries';

type Props = {
    open: boolean;
    onClose(): void;
};

export default function CreateEnvironment({ open, onClose }: Props) {
    const [createEnvironment] = useCreateEnvironmentMutation();

    async function onCreate(values: Record<string, string>) {
        await createEnvironment({
            variables: {
                name: values.name,
            },
        });
        onClose();
    }

    return (
        <CreateModal title="Create Environment" open={open} onClose={onClose} onSubmit={onCreate}>
            {({ register, errors }) => (
                <Input
                    label="Name"
                    name="name"
                    ref={register({ required: true })}
                    errors={errors}
                />
            )}
        </CreateModal>
    );
}
