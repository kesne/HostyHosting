import Link from 'next/link';
import styled from 'styled-components';
import { Layout, Menu } from 'antd';
import PageContainer from '../PageContainer';

type Props = {
    selected: string;
    children: React.ReactNode;
};

const SiderStyled = styled(Layout.Sider)`
    background: #fff;
    margin-right: 16px;
`;

export default function Container({ selected, children }: Props) {
    return (
        <PageContainer>
            <Layout>
                <SiderStyled width={200}>
                    <Menu mode="inline" selectedKeys={[selected]} style={{ height: '100%' }}>
                        <Menu.Item key="account">
                            <Link href="/account">
                                <a>Account</a>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="organization">
                            <Link href="/account/organization">
                                <a>Organization</a>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="security">
                            <Link href="/account/security">
                                <a>Security</a>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="billing">
                            <Link href="/account/billing">
                                <a>Billing</a>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </SiderStyled>
                <Layout.Content>{children}</Layout.Content>
            </Layout>
        </PageContainer>
    );
}
