import React from 'react';
import List, { ListItem } from '../ui/List';
import Card from '../ui/Card';
import CreateAPIKey from './CreateAPIKey';
import Button from '../ui/Button';
import useBoolean from '../../utils/useBoolean';
import { useLazyLoadQuery, graphql, useMutation } from 'react-relay/hooks';
import { APIKeysQuery } from './__generated__/APIKeysQuery.graphql';
import { APIKeysDeleteMutation } from './__generated__/APIKeysDeleteMutation.graphql';

export default function APIKeys() {
    const [open, { on, off }] = useBoolean(false);

    const [commit] = useMutation<APIKeysDeleteMutation>(graphql`
        mutation APIKeysDeleteMutation($id: ID!) {
            deleteAPIKey(id: $id) {
                id
            }
        }
    `);

    const data = useLazyLoadQuery<APIKeysQuery>(
        graphql`
            query APIKeysQuery {
                me {
                    id
                    apiKeys(first: 10) @connection(key: "APIKeys_apiKeys") {
                        edges {
                            node {
                                id
                                description
                                createdAt
                            }
                        }
                    }
                }
            }
        `,
        {},
    );

    function handleDelete(id: string) {
        return () => {
            commit({
                variables: { id },
                configs: [
                    {
                        type: 'RANGE_DELETE',
                        parentID: data.me.id,
                        connectionKeys: [
                            {
                                key: 'APIKeys_apiKeys',
                            },
                        ],
                        pathToConnection: [data.me.id, 'apiKeys'],
                        deletedIDFieldName: 'id',
                    },
                ],
            });
        };
    }

    // TODO: Handle undefined / empty / loading better:
    return (
        <>
            <Card title="Manage API Keys" actions={<Button onClick={on}>Create API Key</Button>}>
                <List items={data.me.apiKeys.edges}>
                    {({ node: apiKey }) => (
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
            <CreateAPIKey id={data.me.id} open={open} onClose={off} />
        </>
    );
}
