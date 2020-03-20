import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Layout, Menu } from 'antd';

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
        <Layout>
            <SiderStyled width={200}>
                <Menu mode="inline" selectedKeys={[selected]} style={{ height: '100%' }}>
                    <Menu.Item key="account">
                        <Link to="/account">Account</Link>
                    </Menu.Item>
                    <Menu.Item key="organization">
                        <Link to="/account/organization">Organization</Link>
                    </Menu.Item>
                    <Menu.Item key="security">
                        <Link to="/account/security">Security</Link>
                    </Menu.Item>
                    <Menu.Item key="billing">
                        <Link to="/account/billing">Billing</Link>
                    </Menu.Item>
                </Menu>
            </SiderStyled>
            <Layout.Content>{children}</Layout.Content>
        </Layout>
    );
}
