import React, { useState } from 'react';
import EditOrAddSecret from './EditOrAddSecret';
import List, { ListItem } from '../../../ui/List';
import Secret, { SecretData } from './Secret';

export type Props = {
    id: number;
    secrets: SecretData[];
};

export default function Secrets({ id, secrets }: Props) {
    const [editing, setEditing] = useState<SecretData | null>(null);

    return (
        <>
            <EditOrAddSecret
                id={id}
                open={!!editing}
                secret={editing}
                onClose={() => setEditing(null)}
            />
            <List items={secrets}>
                {secret => (
                    <ListItem key={secret.id}>
                        <Secret
                            containerGroupID={id}
                            secret={secret}
                            onEdit={data => setEditing(data)}
                        />
                    </ListItem>
                )}
            </List>
        </>
    );
}
