import { Statistic, Timeline, Card, Typography, Row, Col } from 'antd';

export default function Overview() {
    return (
        <Row gutter={16}>
            <Col span={12}>
                <Card>
                    <Statistic title="Monthly Spend" value={2.5} precision={2} prefix="$" />
                </Card>
                <Card>
                    <Typography.Paragraph>
                        Containers
                    </Typography.Paragraph>
                </Card>
            </Col>
            <Col span={12}>
                <Card>
                    <Typography.Paragraph title="test1">Deployment History</Typography.Paragraph>
                    <Timeline>
                        <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                        <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                        <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
                        <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
                    </Timeline>
                </Card>
            </Col>
        </Row>
    );
}
