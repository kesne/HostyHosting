import React from 'react';
import List, { ListItem } from '../ui/List';
import { useMyApiKeysQuery } from '../../queries';

export default function APIKeys() {
    const { data } = useMyApiKeysQuery();

    // TODO: Handle undefined / empty / loading better:
    return (
        <List items={data?.me.apiKeys ?? []}>
            {apiKey => (
                <ListItem>
                    {apiKey.id} - {apiKey.createdAt}
                </ListItem>
            )}
        </List>
    );
}
