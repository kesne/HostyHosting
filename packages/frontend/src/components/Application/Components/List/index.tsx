import React from 'react';
import Component from './Component';
import CreateComponent from './CreateComponent';
import useBoolean from '../../../../utils/useBoolean';
import { useApplicationComponentsQuery } from '../../../../queries';
import { useApplicationParams } from '../../ApplicationContext';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';
import Spinner from '../../../Spinner';
import List, { ListItem } from '../../../ui/List';

export default function Components() {
    const params = useApplicationParams();
    const { data, loading, error } = useApplicationComponentsQuery({
        variables: {
            ...params,
        },
    });
    const [createVisible, { on, off }] = useBoolean(false);

    if (loading || !data || error) {
        return <Spinner />;
    }

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
                {component => (
                    <ListItem key={component.id} to={`${component.id}`}>
                        <Component component={component} />
                    </ListItem>
                )}
            </List>
        </Card>
    );
}
