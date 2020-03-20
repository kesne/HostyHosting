import React from 'react';
import { List, Spin } from 'antd';
import Deployment from './Deployment';
import CreateDeployment from './CreateDeployment';
import useBoolean from '../../utils/useBoolean';
import { useApplicationDeploymentsQuery } from '../../../queries';
import { useApplicationID } from '../ApplicationContext';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { ListItem } from '../../ui/List';

export default function Deployments() {
    const applicationID = useApplicationID();
    const { data, loading, error } = useApplicationDeploymentsQuery({
        variables: {
            id: applicationID
        }
    });
    const [createVisible, { on, off }] = useBoolean(false);

    if (loading || !data || error) {
        return <Spin />;
    }

    return (
        <Card
            title="Deployments"
            actions={
                <Button variant="primary" onClick={on}>
                    Create Deployment
                </Button>
            }
        >
            <CreateDeployment visible={createVisible} onClose={off} />
            <List
                dataSource={data.application.deployments}
                renderItem={(deployment, i) => (
                    <ListItem to="/" last={i === data.application.deployments.length - 1}>
                        <Deployment deployment={deployment} />
                    </ListItem>
                )}
            />
        </Card>
    );
}
