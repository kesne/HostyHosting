import React from 'react';
import CreateEnvironment from './CreateEnvironment';
import useBoolean from '../../utils/useBoolean';
import List, { ListItem } from '../ui/List';
import { graphql, useLazyLoadQuery } from 'react-relay/hooks';
import Button from '../ui/Button';
import HomePage from './HomePage';
import { useParams } from 'react-router-dom';
import { EnvironmentsQuery } from './__generated__/EnvironmentsQuery.graphql';

export default function Environments() {
    const params = useParams();
    const [create, { off, on }] = useBoolean(false);

    const data = useLazyLoadQuery<EnvironmentsQuery>(
        graphql`
            query EnvironmentsQuery($organization: String!) {
                organization(username: $organization) {
                    id
                    environments {
                        id
                        name
                        label
                    }
                }
            }
        `,
        {
            organization: params.organization,
        },
    );

    const { organization } = data;

    return (
        <>
            <HomePage
                title="Environments"
                actions={
                    <Button onClick={on} variant="primary">
                        Create Environment
                    </Button>
                }
            >
                <List items={organization.environments} divide>
                    {environment => (
                        <ListItem key={environment.id}>
                            <div className="text-sm leading-5 font-medium text-indigo-600 truncate">
                                {environment.label}
                            </div>
                        </ListItem>
                    )}
                </List>
            </HomePage>
            <CreateEnvironment organization={organization.id} open={create} onClose={off} />
        </>
    );
}
