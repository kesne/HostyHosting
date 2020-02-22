import Link from 'next/link';
import styled from 'styled-components';
import { Layout, Menu } from 'antd';
import UserButton from './UserButton';
import { useHasUser } from '../utils/user';
import Row from '../Row';

const HeaderLink = styled.a`
    color: white;
`;

export default function Header() {
    const hasUser = useHasUser();

    return (
        <Layout.Header>
            <Row
                after={
                    hasUser ? (
                        <UserButton />
                    ) : (
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            selectedKeys={[]}
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item>
                                <Link href="/auth/sign-in">
                                    <a>Sign In</a>
                                </Link>
                            </Menu.Item>
                        </Menu>
                    )
                }
            >
                <Link href={hasUser ? '/account' : '/'}>
                    <HeaderLink>DaaS</HeaderLink>
                </Link>
            </Row>
        </Layout.Header>
    );
}
