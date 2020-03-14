import Link from 'next/link';
import { Typography, Button, Row } from 'antd';
import { ThunderboltOutlined, LockOutlined, ControlOutlined } from '@ant-design/icons';
import ValueProp from '../components/Landing/ValueProp';
import Spacing from '../components/Spacing';
import PageContainer from '../components/PageContainer';

export default function Landing() {
    return (
        <PageContainer>
            <Typography.Title>Run your docker containers in seconds</Typography.Title>
            <Typography.Title level={4}>
                Tired of serverless? Spend a tiny amount of money, and we will let you run a
                container forever (or at least until we run out of funding)
            </Typography.Title>
            <Spacing top={4} bottom={4}>
                <Button type="primary" size="large" shape="round">
                    <Link href="/auth/sign-up">
                        <a>Get Started</a>
                    </Link>
                </Button>
            </Spacing>
            <Row gutter={16}>
                <ValueProp
                    Icon={LockOutlined}
                    header="Inexpensive"
                    description="Get started for as little as $2.50 a month."
                />
                <ValueProp
                    Icon={ControlOutlined}
                    header="TODO"
                    description="Write a middle point."
                />
                <ValueProp
                    Icon={ThunderboltOutlined}
                    header="Fast"
                    description="Spin up new containers in seconds."
                />
            </Row>
        </PageContainer>
    );
}
