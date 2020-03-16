import Link from 'next/link';
import PageContainer from '../components/PageContainer';

export default function Landing() {
    return (
        <PageContainer>
            <h3>Run your docker containers in seconds</h3>
            <h4>
                Tired of serverless? Spend a tiny amount of money, and we will let you run a
                container forever (or at least until we run out of funding)
            </h4>
            <Link href="/auth/sign-up">
                <a>Get Started</a>
            </Link>
            <div>
                {/* <ValueProp
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
                /> */}
            </div>
        </PageContainer>
    );
}
