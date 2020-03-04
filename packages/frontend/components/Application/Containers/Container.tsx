import { Card, Descriptions, Typography, Tag, Button } from 'antd';
import styled from 'styled-components';
import { Container as ContainerData } from '../../../queries';
import ScaleContainer from './ScaleContainer';

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
    applicationID: number;
    container: Pick<ContainerData, 'id' | 'size' | 'number'>;
};

export default function Container({ applicationID, container }: Props) {
    return (
        <Card size="small">
            <Header>
                <Title>
                    <Typography.Title level={3}>{container.size}x</Typography.Title>
                </Title>
                <Tag>
                    {container.size} CPU Unit, {container.size * 128} MB
                </Tag>
                <Spacer />
                <Actions>
                    <ScaleContainer applicationID={applicationID} id={container.id} currentNumber={container.number} />
                    <Button size="small">Actions</Button>
                </Actions>
            </Header>

            <Descriptions size="small">
                <Descriptions.Item label="Number of Containers">
                    <Typography.Text code>{container.number}</Typography.Text>
                </Descriptions.Item>
                <Descriptions.Item label="Deployment">
                    <Typography.Text code>jeopardy-bot</Typography.Text>
                </Descriptions.Item>
            </Descriptions>

            {/* <Button type="danger">Delete</Button> */}
        </Card>
    );
}
