import Link from 'next/link';
import { Typography, Button, Row } from 'antd';
import { ThunderboltOutlined, LockOutlined, ControlOutlined } from '@ant-design/icons';
import ValueProp from '../components/Home/ValueProp';
import Spacing from '../components/Spacing';
import PageContainer from '../components/PageContainer';

export default function Home() {
    return (
        <PageContainer>
            <Typography.Title>Never reveal your phone number again</Typography.Title>
            <Typography.Title level={4}>
                Send text messages to anyone without revealing your phone number, starting at just
                $5 per month.
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
                    header="Private"
                    description="Messages come from a completely unique phone number."
                />
                <ValueProp
                    Icon={ControlOutlined}
                    header="In Control"
                    description="Stop anyone from messaging you instantly by ending a conversation."
                />
                <ValueProp
                    Icon={ThunderboltOutlined}
                    header="Fast"
                    description="You can start conversations in seconds, without any setup."
                />
            </Row>
        </PageContainer>
    );
}
