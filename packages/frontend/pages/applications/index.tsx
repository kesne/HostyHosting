import { useState } from 'react';
import { Button, PageHeader, List } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Link from 'next/link';
import CreateApplication from '../../components/Applications/CreateApplication';
import { useApplicationsQuery } from '../../queries';
import { withAuth } from '../../components/utils/auth';

const ListLink = styled.a`
    display: block;
    border-bottom: 1px solid #f0f0f0;
    :last-child {
        border-bottom: none;
    }
`;

function Applications() {
    const { data, loading } = useApplicationsQuery();
    const [visible, setVisible] = useState();

    return (
        <div>
            <PageHeader
                ghost={false}
                title="Applications"
                extra={[
                    <Button key="new" type="primary" onClick={() => setVisible(true)}>
                        New
                    </Button>
                ]}
            >
                <List
                    size="large"
                    dataSource={data?.applications}
                    loading={loading}
                    renderItem={item => (
                        <Link href="/applications/[id]" as={`/applications/${item.id}`}>
                            <ListLink>
                                <List.Item actions={[<RightOutlined />]}>
                                    <List.Item.Meta
                                        title={item.name}
                                        description={item.description}
                                    />
                                </List.Item>
                            </ListLink>
                        </Link>
                    )}
                />
            </PageHeader>
            <CreateApplication visible={visible} onClose={() => setVisible(false)} />
        </div>
    );
}

export default withAuth(Applications);
