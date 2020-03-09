import Link from 'next/link';
import styled from 'styled-components';
import { Layout, Menu } from 'antd';
import { useRouter } from 'next/router';
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

export default function Header() {
    const router = useRouter();
    const hasUser = useHasUser();

    const [, selectedKey] = router.route.split('/');

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
                        <Link href="/">
                            <HeaderLink>DaaS</HeaderLink>
                        </Link>
                    </Logo>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        selectedKeys={[selectedKey]}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="applications">
                            <Link href="/applications">
                                <a>Applications</a>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="routing">
                            <Link href="/routing">
                                <a>Routing</a>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </HeaderContents>
            </Row>
        </Layout.Header>
    );
}
