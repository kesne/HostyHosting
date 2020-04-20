import React from 'react';
import { AddSecretDocument, EditSecretDocument } from '../../../../queries';
import Input from '../../../ui/Input';
import { useApplicationID } from '../../ApplicationContext';
import CreateModal from '../../../ui/CreateModal';
import { useMutation, Reference } from '@apollo/client';
import { SecretData } from './Secret';

type Props = {
    id: number;
    secret?: SecretData | null;
    open: boolean;
    onClose(): void;
    create?: boolean;
};

export default function EditOrAddSecret({ id, secret, open, onClose, create }: Props) {
    const applicationID = useApplicationID();
    const [addOrEditSecret, { loading }] = useMutation(
        create ? AddSecretDocument : EditSecretDocument,
        {
            update(cache, { data }) {
                if (!data || !create) return;

                cache.modify(`Component:${id}`, {
                    secrets(secrets: Reference[], { toReference }) {
                        return [...secrets, toReference(data.application.addSecret)]
                    }
                });
            },
        },
    );

    async function onSubmit(values: Record<string, string>) {
        await addOrEditSecret({
            variables: {
                applicationID,
                componentID: id,
                secretID: secret?.id,
                key: values.key,
                value: values.value,
            },
        });

        onClose();
    }

    return (
        <CreateModal
            title={create ? 'Create New Secret' : 'Edit Secret'}
            onSubmit={onSubmit}
            open={open}
            onClose={onClose}
        >
            {({ errors, register }) => (
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
            )}
        </CreateModal>
    );
}
