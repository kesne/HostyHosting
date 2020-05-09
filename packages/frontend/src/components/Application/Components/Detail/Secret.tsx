import React from 'react';
import { useDeleteSecretMutation } from '../../../../queries';
import { useApplicationParams } from '../../ApplicationContext';
import Button, { ButtonGroup } from '../../../ui/Button';
import { Reference } from '@apollo/client';

export type SecretData = {
    id: number;
    key: string;
    value: string;
};

type Props = {
    containerGroupID: number;
    onEdit(secret: SecretData): void;
    secret: SecretData;
};

export default function Secret({ containerGroupID, secret, onEdit }: Props) {
    const params = useApplicationParams();
    const [deleteSecret] = useDeleteSecretMutation({
        variables: {
            ...params,
            containerGroupID,
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
                `ContainerGroup:${containerGroupID}`,
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
