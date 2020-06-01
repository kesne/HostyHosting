import React, { useState } from 'react';
import EditOrAddSecret, { SecretEdit } from './EditOrAddSecret';
import List, { ListItem } from '../../../../ui/List';
import Secret from './Secret';
import { useFragment, graphql } from 'react-relay/hooks';
import Card from '../../../../ui/Card';
import Button from '../../../../ui/Button';
import Pagination from '../../../../ui/Pagination';
import { Secrets_containerGroup$key } from './__generated__/Secrets_containerGroup.graphql';

export type Props = {
    id: string;
    containerGroup: Secrets_containerGroup$key;
    onNextPage(): void;
    onPreviousPage(): void;
};

export default function Secrets({ containerGroup, onNextPage, onPreviousPage }: Props) {
    const [modalSecret, setModalSecret] = useState<null | { secret?: SecretEdit }>(null);

    const data = useFragment(
        graphql`
            fragment Secrets_containerGroup on ContainerGroup
                @argumentDefinitions(
                    limit: { type: "Int", defaultValue: 10 }
                    offset: { type: "Int", defaultValue: 0 }
                ) {
                id
                secrets(limit: $limit, offset: $offset) {
                    pageInfo {
                        hasNextPage
                        hasPreviousPage
                    }
                    edges {
                        node {
                            ...Secret_secret
                        }
                    }
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
                    Add Secret
                </Button>
            }
        >
            <EditOrAddSecret
                id={data.id}
                open={!!modalSecret}
                onClose={() => setModalSecret(null)}
                secret={modalSecret?.secret}
            />
            <List connection={data.secrets}>
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
            <Pagination
                pageInfo={data.secrets.pageInfo}
                onNextPage={onNextPage}
                onPreviousPage={onPreviousPage}
            />
        </Card>
    );
}
