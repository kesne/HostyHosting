import React from 'react';
import Card from '../ui/Card';
import { useFragment, graphql } from 'react-relay/hooks';
import { Applications_organization$key } from './__generated__/Applications_organization.graphql';
import List, { ListItem } from '../ui/List';
import Button from '../ui/Button';
import CreateApplication from './CreateApplication';
import useBoolean from '../../utils/useBoolean';

type Props = {
    organization: Applications_organization$key;
};

export default function Applications({ organization }: Props) {
    const [create, { off, on }] = useBoolean(false);

    const data = useFragment(
        graphql`
            fragment Applications_organization on Organization {
                id
                username
                applications {
                    id
                    name
                    description
                }
            }
        `,
        organization,
    );

    return (
        <>
            <Card
                title="Applications"
                actions={
                    <Button onClick={on} variant="primary">
                        New Application
                    </Button>
                }
            >
                <List items={data.applications}>
                    {application => (
                        <ListItem
                            key={application.id}
                            to={`/orgs/${data.username}/apps/${application.name}`}
                        >
                            <div className="text-sm leading-5 font-medium text-indigo-600 truncate">
                                {application.name}
                            </div>
                        </ListItem>
                    )}
                </List>
            </Card>
            <CreateApplication organization={data.id} visible={create} onClose={off} />
        </>
    );
}
