import { Card, Descriptions, Typography, Tag, Button } from 'antd';
import styled from 'styled-components';

const Header = styled.div`
    display: flex;
    align-items: center;
`;

const Title = styled.div`
    margin-right: 16px;
`;

const Actions = styled.div`
    margin-left: 16px;
`;

const Spacer = styled.div`
    flex: 1;
`;

const Count = styled.div`
    display: flex;
`;

export default function Container() {
    return (
        <Card>
            <Header>
                <Title>
                    <Typography.Title level={3}>1x</Typography.Title>
                </Title>
                <Tag>1 CPU Unit, 128 MB</Tag>
                <Spacer />
                <Actions>
                    <Count>
                        {/*
                            We probably want this to be a more explicit action
                            via a modal, to change the scale of the containers.
                            We also probably want some visualization of the individual
                            containers in the container group (I think spinnaker has
                            something like this?)
                            Honestly this should probably just be a button like "Scale Container Group".
                        */}
                        <Button size="small">-</Button>
                        <Typography.Text strong>Scale: 3</Typography.Text>
                        <Button size="small">+</Button>
                    </Count>
                </Actions>
            </Header>

            <Descriptions size="small">
                <Descriptions.Item label="Deployment">
                    <Typography.Text code>jeopardy-bot</Typography.Text>
                </Descriptions.Item>
            </Descriptions>

            <Button type="danger">Delete</Button>
        </Card>
    );
}
