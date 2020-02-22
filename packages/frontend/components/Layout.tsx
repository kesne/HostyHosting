import { ApolloProvider } from '@apollo/react-hooks';
import { Layout } from 'antd';
import styled from 'styled-components';
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
            <ApolloProvider client={client}>
                <Root>
                    <Header />
                    {children}
                </Root>
            </ApolloProvider>
        </Layout>
    );
}
