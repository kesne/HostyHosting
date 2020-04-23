import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from '../../client';

export default function Provider({ children }: { children: React.ReactNode }) {
    return <ApolloProvider client={client}>{children}</ApolloProvider>
}
