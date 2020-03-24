import React from 'react';
import ContainerGroup from './ContainerGroup';
import CreateContainerGroup from './CreateContainerGroup';
import useBoolean from '../../../utils/useBoolean';
import { useApplicationContainerGroupsQuery } from '../../../queries';
import { useApplicationID } from '../ApplicationContext';
import Card from '@daas/ui/Card';
import Button from '@daas/ui/Button';
import List from '@daas/ui/List';
import Spinner from '../../Spinner';
import { EnterItem, EnterContainer } from '@daas/ui/motion/Enter';

export default function ContainerGroups() {
    const applicationID = useApplicationID();
    const { data, loading, error } = useApplicationContainerGroupsQuery({
        variables: {
            id: applicationID
        }
    });
    const [createVisible, { on, off }] = useBoolean(false);

    if (loading || !data || error) {
        return <Spinner />;
    }

    return (
        <EnterContainer>
            <EnterItem>
                <Card
                    title="Container Groups"
                    actions={
                        <Button variant="primary" onClick={on}>
                            Create Container Group
                        </Button>
                    }
                >
                    <CreateContainerGroup visible={createVisible} onClose={off} />
                    <List items={data.application.containerGroups}>
                        {item => <ContainerGroup key={item.id} containerGroup={item} />}
                    </List>
                </Card>
            </EnterItem>
        </EnterContainer>
    );
}
