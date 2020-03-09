import { Button, List, Spin } from 'antd';
import styled from 'styled-components';
import ContainerGroup from './ContainerGroup';
import CreateContainerGroup from './CreateContainerGroup';
import useBoolean from '../../utils/useBoolean';
import { useApplicationContainerGroupsQuery } from '../../../queries';
import { useContext } from 'react';
import ApplicationContext from '../ApplicationContext';

const Actions = styled.div`
    margin-bottom: 16px;
    display: flex;
    justify-content: flex-end;
`;

export default function ContainerGroups() {
    const applicationID = useContext(ApplicationContext);
    const { data, loading, error } = useApplicationContainerGroupsQuery({
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
                    Create Container Group
                </Button>
            </Actions>
            <CreateContainerGroup visible={createVisible} onClose={off} />
            <List
                grid={{ gutter: 16, xs: 1, sm: 1, md: 2 }}
                dataSource={data.application.containerGroups}
                renderItem={containerGroup => (
                    <List.Item>
                        <ContainerGroup containerGroup={containerGroup} />
                    </List.Item>
                )}
            />
        </div>
    );
}
