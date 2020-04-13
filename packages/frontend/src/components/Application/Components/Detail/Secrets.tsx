import React, { useState } from 'react';
import { useUpdateApplicationMutation, Secret } from '../../../../queries';
import EditOrAddSecret from './EditOrAddSecret';
import Button, { ButtonGroup } from '../../../ui/Button';
import List, { ListItem } from '../../../ui/List';
import useBoolean from '../../../../utils/useBoolean';

export type Props = {
    id: number;
    secrets: any[];
};

export default function Secrets({ id, secrets }: Props) {
    const [editing, setEditing] = useState<Secret | null>(null);

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
                    <ListItem>
                        <div className="flex text-gray-800" key={secret.key}>
                            <div className="flex-1 font-mono">{secret.key || 'KEY'}</div>
                            <div className="flex-1 font-mono">{secret.value || 'VALUE'}</div>

                            <ButtonGroup>
                                <Button onClick={() => setEditing(secret)}>Edit</Button>
                                <Button>Delete</Button>
                            </ButtonGroup>
                        </div>
                    </ListItem>
                )}
            </List>
        </>
    );
}
