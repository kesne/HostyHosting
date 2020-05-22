import React from 'react';
import { useParams } from 'react-router-dom';
import { useLazyLoadQuery, graphql } from 'react-relay/hooks';
import List, { ListItem } from '../ui/List';
import Button from '../ui/Button';
import CreateApplication from './CreateApplication';
import useBoolean from '../../utils/useBoolean';
import HomePage from './HomePage';
import { ApplicationsQuery } from './__generated__/ApplicationsQuery.graphql';

export default function Applications() {
    const params = useParams();
    const [create, { off, on }] = useBoolean(false);

    const data = useLazyLoadQuery<ApplicationsQuery>(
        graphql`
            query ApplicationsQuery($organization: String!) {
                organization(username: $organization) {
                    id
                    username
                    applications {
                        id
                        name
                        description
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
                title="Applications"
                actions={
                    <Button onClick={on} variant="primary">
                        Create Application
                    </Button>
                }
            >
                <List items={organization.applications} divide>
                    {application => (
                        <ListItem
                            key={application.id}
                            to={`/orgs/${organization.username}/apps/${application.name}`}
                        >
                            <div className="text-gray-900 text-base">{application.name}</div>
                            {application.description && (
                                <div className="text-sm text-gray-500 mt-2">
                                    {application.description}
                                </div>
                            )}
                        </ListItem>
                    )}
                </List>
            </HomePage>
            <CreateApplication organization={organization.id} visible={create} onClose={off} />
        </>
    );
}
