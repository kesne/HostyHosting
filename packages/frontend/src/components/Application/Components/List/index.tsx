import React from 'react';
import { useLazyLoadQuery, graphql } from 'react-relay/hooks';
import Component from './Component';
import CreateComponent from './CreateComponent';
import useBoolean from '../../../../utils/useBoolean';
import { useApplicationParams } from '../../ApplicationContext';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';
import List from '../../../ui/List';
import { ListQuery } from './__generated__/ListQuery.graphql';

export default function Components() {
    const params = useApplicationParams();

    const data = useLazyLoadQuery<ListQuery>(graphql`
        query ListQuery($application: ID!) {
            application(id: $application) {
                id
                components {
                    ...Component_component
                }
            }
        }
    `, {
        application: params.application
    });

    const [createVisible, { on, off }] = useBoolean(false);

    const { application } = data;

    return (
        <Card
            title="Components"
            actions={
                <Button variant="primary" onClick={on}>
                    Create Component
                </Button>
            }
        >
            <CreateComponent visible={createVisible} onClose={off} />
            <List items={application.components}>
                {component => <Component component={component} />}
            </List>
        </Card>
    );
}
