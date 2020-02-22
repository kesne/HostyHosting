import { Menu } from 'antd';
import Link from 'next/link';
import { useMeQuery } from '../../queries';
import { signOut } from '../utils/user';

export default function UserButton() {
    const { data, loading } = useMeQuery();

    function handleSignOut() {
        signOut();
    }

    if (loading || !data || !data.me) {
        return null;
    }

    return (
        <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
            <Menu.SubMenu title={data.me.name}>
                <Menu.Item>
                    <Link href="/account">
                        <a>My account</a>
                    </Link>
                </Menu.Item>
                <Menu.Item onClick={handleSignOut}>Sign out</Menu.Item>
            </Menu.SubMenu>
        </Menu>
    );
}
