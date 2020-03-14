import Link from 'next/link';
import styled from 'styled-components';
import { Layout, Menu } from 'antd';
import UserButton from './UserButton';
import { useHasUser } from '../utils/user';
import Row from '../Row';

const Logo = styled.div`
    margin-right: 32px;
    font-weight: bold;
    font-size: 1.4rem;
`;

const HeaderLink = styled.a`
    color: white;
`;

const HeaderContents = styled.div`
    display: flex;
`;

export { default as default } from './header2';

function Header() {
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
                <HeaderContents>
                    <Logo>
                        {/* TODO: Make this /home or / depending on the user state. */}
                        <Link href="/home">
                            <HeaderLink>DaaS</HeaderLink>
                        </Link>
                    </Logo>
                </HeaderContents>
            </Row>
        </Layout.Header>
    );
}
