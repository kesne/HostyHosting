import { Divider, Row, Col, Typography } from 'antd';

type Props = {
    title: string;
    description?: string;
    last?: boolean;
    children: any;
};

export default function Region({ title, description, children, last }: Props) {
    return (
        <>
            <Row gutter={16}>
                <Col span={6}>
                    <Typography.Title level={4}>{title}</Typography.Title>
                    {description && <Typography.Paragraph>{description}</Typography.Paragraph>}
                </Col>
                <Col span={18}>
                    {children}
                </Col>
            </Row>
            {!last && <Divider />}
        </>
    );
}
