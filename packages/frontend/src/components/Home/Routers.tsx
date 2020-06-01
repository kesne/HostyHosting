import React from 'react';
import HomePage from './HomePage';
import Button from '../ui/Button';
import { useLazyLoadQuery, graphql } from 'react-relay/hooks';
import { useParams } from 'react-router-dom';
import { RoutersQuery } from './__generated__/RoutersQuery.graphql';
import CreateRouter from './CreateRouter';
import useBoolean from '../../utils/useBoolean';
import List, { ListItem } from '../ui/List';

export default function Routers() {
    const params = useParams();
    const [creating, { off, on }] = useBoolean(false);

    const data = useLazyLoadQuery<RoutersQuery>(
        graphql`
            query RoutersQuery($organization: String!) {
                organization(username: $organization) {
                    id
                    username
                    routers {
                        id
                        label
                    }
                }
            }
        `,
        {
            organization: params.organization,
        },
    );

    return (
        <HomePage
            title="Routers"
            actions={
                <Button variant="primary" onClick={on}>
                    Create Router
                </Button>
            }
        >
            <List items={data.organization.routers}>
                {router => (
                    <ListItem to={`/router/${router.id}`} key={router.id}>
                        <div>{router.label}</div>
                    </ListItem>
                )}
            </List>
            <CreateRouter organization={data.organization.id} open={creating} onClose={off} />
        </HomePage>
    );
}
