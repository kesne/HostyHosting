import React, { useState } from 'react';
import EditOrAddSecret, { SecretEdit } from './EditOrAddSecret';
import List, { ListItem } from '../../../../ui/List';
import Secret from './Secret';
import { useFragment, graphql } from 'react-relay/hooks';
import { Secrets_containerGroup$key } from '../__generated__/Secrets_containerGroup.graphql';
import Card from '../../../../ui/Card';
import Button from '../../../../ui/Button';

export type Props = {
    id: string;
    containerGroup: Secrets_containerGroup$key;
};

export default function Secrets({ containerGroup }: Props) {
    const [modalSecret, setModalSecret] = useState<null | { secret?: SecretEdit }>(null);

    const data = useFragment(
        graphql`
            fragment Secrets_containerGroup on ContainerGroup {
                id
                secrets {
                    ...Secret_secret
                }
            }
        `,
        containerGroup,
    );

    return (
        <Card
            title="Secrets"
            actions={
                <Button variant="primary" onClick={() => setModalSecret({})}>
                    Add
                </Button>
            }
        >
            <EditOrAddSecret
                id={data.id}
                open={!!modalSecret}
                onClose={() => setModalSecret(null)}
                secret={modalSecret?.secret}
            />
            <List items={data.secrets}>
                {secret => (
                    <ListItem>
                        <Secret
                            containerGroupID={data.id}
                            secret={secret}
                            onEdit={data => setModalSecret({ secret: data })}
                        />
                    </ListItem>
                )}
            </List>
        </Card>
    );
}
