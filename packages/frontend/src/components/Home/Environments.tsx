import React from 'react';
import CreateEnvironment from './CreateEnvironment';
import useBoolean from '../../utils/useBoolean';
import Card from '../ui/Card';
import List, { ListItem } from '../ui/List';
import { useFragment, graphql } from 'react-relay/hooks';
import { Environments_organization$key } from './__generated__/Environments_organization.graphql';
import Button from '../ui/Button';

type Props = {
    organization: Environments_organization$key;
};

export default function Environments({ organization }: Props) {
    const [create, { off, on }] = useBoolean(false);

    const data = useFragment(
        graphql`
            fragment Environments_organization on Organization {
                id
                environments {
                    id
                    name
                    label
                }
            }
        `,
        organization,
    );

    return (
        <>
            <Card
                title="Environments"
                actions={
                    <Button onClick={on} variant="primary">
                        New Environment
                    </Button>
                }
            >
                <List items={data.environments}>
                    {environment => (
                        <ListItem key={environment.id}>
                            <div className="text-sm leading-5 font-medium text-indigo-600 truncate">
                                {environment.label}
                            </div>
                        </ListItem>
                    )}
                </List>
            </Card>
            <CreateEnvironment organization={data.id} open={create} onClose={off} />
        </>
    );
}
