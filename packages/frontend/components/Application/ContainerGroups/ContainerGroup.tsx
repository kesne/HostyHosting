import { Card, Descriptions, Typography, Tag, Button } from 'antd';
import styled from 'styled-components';
import { ContainerGroup as ContainerGroupData } from '../../../queries';
import ScaleContainerGroup from './ScaleContainerGroup';
import DeleteContainerGroup from './DeleteContainerGroup';

const Header = styled.div`
    display: flex;
    align-items: center;
`;

const Title = styled.div`
    margin-right: 16px;
`;

const Actions = styled.div`
    margin-left: 16px;
    .ant-btn {
        margin-right: 8px;
        margin-bottom: 12px;
    }
`;

const Spacer = styled.div`
    flex: 1;
`;

type Props = {
    // TODO: This type is subtly wrong:
    containerGroup: Pick<ContainerGroupData, 'id' | 'size' | 'containerCount' | 'label' | 'deployment'>;
};

export default function Container({ containerGroup }: Props) {
    return (
        <Card size="small">
            <Header>
                <Title>
                    <Typography.Title level={3}>{containerGroup.label}</Typography.Title>
                </Title>
                <Spacer />
                <Actions>
                    <ScaleContainerGroup
                        id={containerGroup.id}
                        currentNumber={containerGroup.containerCount}
                    />
                    <Button size="small">Actions</Button>
                </Actions>
            </Header>

            <Tag>
                {containerGroup.size} CPU Unit, {containerGroup.size * 128} MB
            </Tag>

            <Descriptions size="small">
                <Descriptions.Item label="Size">
                    <Typography.Text code>{containerGroup.size}x</Typography.Text>
                </Descriptions.Item>
                <Descriptions.Item label="Number of Containers">
                    <Typography.Text code>{containerGroup.containerCount}</Typography.Text>
                </Descriptions.Item>
                <Descriptions.Item label="Deployment">
                    <Typography.Text code>{containerGroup.deployment?.image}</Typography.Text>
                </Descriptions.Item>
            </Descriptions>

            <DeleteContainerGroup id={containerGroup.id} />
        </Card>
    );
}
