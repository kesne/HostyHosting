import React from 'react';
import Button, { ButtonGroup } from '../../../../ui/Button';
import { useFragment, graphql, useMutation } from 'react-relay/hooks';
import { Secret_secret$key } from './__generated__/Secret_secret.graphql';
import { SecretDeleteMutation } from './__generated__/SecretDeleteMutation.graphql';
import { SecretEdit } from './EditOrAddSecret';

type Props = {
    containerGroupID: string;
    onEdit(secret: SecretEdit): void;
    secret: Secret_secret$key;
};

export default function Secret({ containerGroupID, onEdit, secret }: Props) {
    const data = useFragment(
        graphql`
            fragment Secret_secret on Secret {
                id
                key
                value
            }
        `,
        secret,
    );

    const [commit, isInFlight] = useMutation<SecretDeleteMutation>(graphql`
        mutation SecretDeleteMutation($input: DeleteSecretInput!) {
            deleteSecret(input: $input) {
                id
            }
        }
    `);

    function handleDelete() {
        commit({
            variables: {
                input: {
                    secretID: data.id,
                },
            },
            // TODO: This doesn't remove the secret itself from storage.
            // When we move this to be connection-based, we should be good to go.
            updater(store) {
                const containerGroup = store.get(containerGroupID)!;
                const newNodes = containerGroup!.getLinkedRecords('secrets')!.filter(secret => {
                    return data.id !== secret.getValue('id');
                });
                containerGroup!.setLinkedRecords(newNodes, 'secrets');
            },
        });
    }

    return (
        <div className="flex text-gray-800">
            <div className="flex-1 font-mono">{data.key}</div>
            <div className="flex-1 font-mono">{data.value}</div>

            <ButtonGroup>
                <Button onClick={() => onEdit(data)}>Edit</Button>
                <Button onClick={handleDelete} disabled={isInFlight}>
                    Delete
                </Button>
            </ButtonGroup>
        </div>
    );
}
