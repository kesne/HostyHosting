import { Button, List } from 'antd';
import styled from 'styled-components';
import Deployment from './Deployment';
import CreateDeployment from './CreateDeployment';
import useBoolean from '../../utils/useBoolean';
import { Application } from '../../../queries';

const Actions = styled.div`
    margin-bottom: 16px;
    display: flex;
    justify-content: flex-end;
`;

type Props = {
    application: Pick<Application, 'id' | 'deployments'>;
};

export default function Deployments({ application }: Props) {
    const [createVisible, { on, off }] = useBoolean(false);

    return (
        <div>
            <Actions>
                <Button type="primary" onClick={on}>
                    Create Deployment
                </Button>
            </Actions>
            <CreateDeployment id={application.id} visible={createVisible} onClose={off} />
            <List
                grid={{ gutter: 16, column: 2 }}
                dataSource={application.deployments}
                renderItem={deployment => (
                    <List.Item>
                        <Deployment applicationID={application.id} deployment={deployment} />
                    </List.Item>
                )}
            />
        </div>
    );
}
