import React from 'react';
import { useDeleteSecretMutation } from '../../../../queries';
import { useApplicationID } from '../../ApplicationContext';
import Button, { ButtonGroup } from '../../../ui/Button';
import { Reference } from '@apollo/client';

export type SecretData = {
    id: number;
    key: string;
    value: string;
};

type Props = {
    componentID: number;
    onEdit(secret: SecretData): void;
    secret: SecretData;
};

export default function Secret({ componentID, secret, onEdit }: Props) {
    const applicationID = useApplicationID();
    const [deleteSecret] = useDeleteSecretMutation({
        variables: {
            applicationID,
            componentID,
            secretID: secret.id,
        },
        update(cache, { data }) {
            if (!data) return;

            cache.modify(
                {
                    secrets(secrets: Reference[], { readField }) {
                        return secrets.filter(
                            secret => data.application.deleteSecret.id !== readField('id', secret),
                        );
                    },
                },
                `Component:${componentID}`,
            );

            cache.evict(`Secret:${secret.id}`);
        },
    });

    return (
        <div className="flex text-gray-800" key={secret.key}>
            <div className="flex-1 font-mono">{secret.key || 'KEY'}</div>
            <div className="flex-1 font-mono">{secret.value || 'VALUE'}</div>

            <ButtonGroup>
                <Button onClick={() => onEdit(secret)}>Edit</Button>
                <Button onClick={() => deleteSecret()}>Delete</Button>
            </ButtonGroup>
        </div>
    );
}
