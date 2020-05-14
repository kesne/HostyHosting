import React, { Suspense } from 'react';
import { ApolloProvider } from '@apollo/client';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import client from '../utils/client';
import Header from './Header';
import environment from '../utils/environment';

export default function App({ children }: { children: any }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <RelayEnvironmentProvider environment={environment}>
                <ApolloProvider client={client}>
                    <Suspense fallback="TODO: REMOVE THIS BEFORE SHIPPING ANYTHING">
                        <div className="flex flex-col">
                            <Header />
                            {children}
                        </div>
                    </Suspense>
                </ApolloProvider>
            </RelayEnvironmentProvider>
        </div>
    );
}
