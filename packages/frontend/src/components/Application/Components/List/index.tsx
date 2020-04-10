import React from 'react';
import Component from './Component';
import CreateComponent from './CreateComponent';
import useBoolean from '../../../../utils/useBoolean';
import { useApplicationComponentsQuery } from '../../../../queries';
import { useApplicationID } from '../../ApplicationContext';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';
import Spinner from '../../../Spinner';
import List, { ListItem } from '../../../ui/List';

export default function Components() {
    const applicationID = useApplicationID();
    const { data, loading, error } = useApplicationComponentsQuery({
        variables: {
            id: applicationID,
        },
    });
    const [createVisible, { on, off }] = useBoolean(false);

    if (loading || !data || error) {
        return <Spinner />;
    }

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
            <List items={data.application.components}>
                {component => (
                    // TODO: Use route match url isntead of re-creating full URL?
                    <ListItem
                        key={component.id}
                        to={`/applications/${applicationID}/components/${component.id}`}
                    >
                        <Component component={component} />
                    </ListItem>
                )}
            </List>
        </Card>
    );
}
