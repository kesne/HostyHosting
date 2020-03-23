import React from 'react';
import Deployment from './Deployment';
import CreateDeployment from './CreateDeployment';
import useBoolean from '../../../../utils/useBoolean';
import { useApplicationDeploymentsQuery } from '../../../../queries';
import { useApplicationID } from '../../ApplicationContext';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';
import Spinner from '../../../Spinner';
import List, { ListItem } from '../../../ui/List';
import { EnterContainer, EnterItem } from '../../../ui/motion/Enter';

export default function Deployments() {
    const applicationID = useApplicationID();
    const { data, loading, error } = useApplicationDeploymentsQuery({
        variables: {
            id: applicationID,
        },
    });
    const [createVisible, { on, off }] = useBoolean(false);

    if (loading || !data || error) {
        return <Spinner />;
    }

    return (
        <EnterContainer>
            <EnterItem>
                <Card
                    title="Deployments"
                    actions={
                        <Button variant="primary" onClick={on}>
                            Create Deployment
                        </Button>
                    }
                >
                    <CreateDeployment visible={createVisible} onClose={off} />
                    <List items={data.application.deployments}>
                        {(deployment, i) => (
                            // TODO: Use route match url isntead of re-creating full URL?
                            <ListItem
                                to={`/applications/${applicationID}/deployments/${deployment.id}`}
                                last={i === data.application.deployments.length - 1}
                            >
                                <Deployment deployment={deployment} />
                            </ListItem>
                        )}
                    </List>
                </Card>
            </EnterItem>
        </EnterContainer>
    );
}
