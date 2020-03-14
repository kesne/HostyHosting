import { ApolloProvider } from '@apollo/react-hooks';
import { Layout } from 'antd';
import styled from 'styled-components';
import Head from 'next/head';
import client from './utils/client';
import Header from './Header';

const Root = styled.div`
    display: flex;
    flex-direction: column;
    // TODO: This should probably be min-height,
    // we just need to sort out the messages view.
    height: 100vh;
`;

export default function App({ children }: { children: any }) {
    return (
        <Layout>
            <Head>
                <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
            </Head>
            <ApolloProvider client={client}>
                <Root>
                    <Header />
                    {children}
                </Root>
            </ApolloProvider>
        </Layout>
    );
}
