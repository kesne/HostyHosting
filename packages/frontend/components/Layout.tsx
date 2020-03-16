import { ApolloProvider } from '@apollo/react-hooks';
import Head from 'next/head';
import client from './utils/client';
import Header from './Header';

export default function App({ children }: { children: any }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <Head>
                <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
            </Head>
            <ApolloProvider client={client}>
                <div className="flex flex-col">
                    <Header />
                    {children}
                </div>
            </ApolloProvider>
        </div>
    );
}
