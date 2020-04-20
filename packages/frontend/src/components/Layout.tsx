import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from '../utils/client';
import Header from './Header';

export default function App({ children }: { children: any }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <ApolloProvider client={client}>
                <div className="flex flex-col">
                    <Header />
                    {children}
                </div>
            </ApolloProvider>
        </div>
    );
}
