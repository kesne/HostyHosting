import React from 'react';
import List, { ListItem } from '../ui/List';
import { useMyApiKeysQuery, useDeleteApiKeyMutation } from '../../queries';
import Card from '../ui/Card';
import CreateAPIKey from './CreateAPIKey';
import Button from '../ui/Button';
import useBoolean from '../../utils/useBoolean';

export default function APIKeys() {
    const [open, { on, off }] = useBoolean(false);
    const { data } = useMyApiKeysQuery();
    const [deleteAPIKey] = useDeleteApiKeyMutation();

    function handleDelete(id: number) {
        return () => {
            deleteAPIKey({ variables: { id } });
        };
    }

    // TODO: Handle undefined / empty / loading better:
    return (
        <>
            <Card title="Manage API Keys" actions={<Button onClick={on}>Create API Key</Button>}>
                <List items={data?.me.apiKeys ?? []}>
                    {apiKey => (
                        <ListItem key={apiKey.id}>
                            <div className="flex justify-between">
                                <div>{apiKey.description}</div>
                                <div>
                                    {new Date(apiKey.createdAt).toLocaleString()}
                                    <Button variant="danger" onClick={handleDelete(apiKey.id)}>
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </ListItem>
                    )}
                </List>
            </Card>
            <CreateAPIKey open={open} onClose={off} />
        </>
    );
}
