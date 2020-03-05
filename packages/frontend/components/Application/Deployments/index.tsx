import { Button, List, Spin } from 'antd';
import styled from 'styled-components';
import Deployment from './Deployment';
import CreateDeployment from './CreateDeployment';
import useBoolean from '../../utils/useBoolean';
import { useApplicationDeploymentsQuery } from '../../../queries';
import { useContext } from 'react';
import ApplicationContext from '../ApplicationContext';

const Actions = styled.div`
    margin-bottom: 16px;
    display: flex;
    justify-content: flex-end;
`;

export default function Deployments() {
    const applicationID = useContext(ApplicationContext);
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
        <div>
            <Actions>
                <Button type="primary" onClick={on}>
                    Create Deployment
                </Button>
            </Actions>
            <CreateDeployment id={data.application.id} visible={createVisible} onClose={off} />
            <List
                grid={{ gutter: 16, column: 2 }}
                dataSource={data.application.deployments}
                renderItem={deployment => (
                    <List.Item>
                        <Deployment applicationID={data.application.id} deployment={deployment} />
                    </List.Item>
                )}
            />
        </div>
    );
}
