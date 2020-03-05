import { Button, List, Spin } from 'antd';
import styled from 'styled-components';
import Container from './Container';
import CreateContainer from './CreateContainer';
import useBoolean from '../../utils/useBoolean';
import { useApplicationContainersQuery } from '../../../queries';
import { useContext } from 'react';
import ApplicationContext from '../ApplicationContext';

const Actions = styled.div`
    margin-bottom: 16px;
    display: flex;
    justify-content: flex-end;
`;

export default function Containers() {
    const applicationID = useContext(ApplicationContext);
    const { data, loading, error } = useApplicationContainersQuery({
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
                    Create Container
                </Button>
            </Actions>
            <CreateContainer visible={createVisible} onClose={off} />
            <List
                grid={{ gutter: 16, column: 2 }}
                dataSource={data.application.containers}
                renderItem={container => (
                    <List.Item>
                        <Container container={container} />
                    </List.Item>
                )}
            />
        </div>
    );
}
