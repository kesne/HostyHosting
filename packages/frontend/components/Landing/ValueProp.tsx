import { Col, Card, Typography } from 'antd';
import Row from '../Row';

type Props = {
    header: string;
    description: string;
    Icon: React.ComponentType<any>;
};

export default function ValueProp({ header, description, Icon }: Props) {
    return (
        <Col span={8}>
            <Card>
                <Row before={<Icon style={{ fontSize: 64 }} />}>
                    <Typography.Title level={4}>{header}</Typography.Title>
                    <Typography.Text>{description}</Typography.Text>
                </Row>
            </Card>
        </Col>
    );
}
