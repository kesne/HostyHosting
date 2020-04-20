import React from 'react';
import Input from '../ui/Input';
import CreateModal from '../ui/CreateModal';
import { useCreateEnvironmentMutation } from '../../queries';
import { Reference } from '@apollo/client';

type Props = {
    organization?: number;
    open: boolean;
    onClose(): void;
};

export default function CreateEnvironment({ organization, open, onClose }: Props) {
    const [createEnvironment] = useCreateEnvironmentMutation({
        update(cache, { data }) {
            if (!data) return;

            cache.modify(`Organization:${organization}`, {
                environments(envs: Reference[], { toReference }) {
                    return [...envs, toReference(data.organization.createEnvironment)];
                },
            });
        },
    });

    async function onCreate(values: Record<string, string>) {
        await createEnvironment({
            variables: {
                org: organization,
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
