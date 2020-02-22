import isomorphicFetch from 'isomorphic-fetch';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink, split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import ws from 'websocket';
import { signOut, checkCookies } from './user';

const httpLink = new HttpLink({
    uri: '/api/graphql',
    credentials: 'include',
    // TODO: Replace this custom fetch cookie logic with a custom link:
    fetch: (input: RequestInfo, init?: RequestInit) =>
        isomorphicFetch(input, init).then(res => {
            checkCookies();
            return res;
        })
});

const wsLink = new WebSocketLink({
    uri:
        typeof window === 'undefined'
            ? '/this-should-never-be-called-and-means-a-subscription-is-being-created-on-the-server'
            : `ws://${'localhost:1337' || location.host}/api/graphql/subscriptions`,
    options: {
        reconnect: true,
        lazy: true
    },
    webSocketImpl: typeof window === 'undefined' ? ws.client : WebSocket
});

const networkLink = split(
    // split based on operation type
    ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    httpLink
);

const client = new ApolloClient({
    link: ApolloLink.from([
        onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors)
                graphQLErrors.forEach(({ message, locations, path }) =>
                    console.log(
                        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                    )
                );
            if (networkError) console.log(`[Network error]: ${networkError}`);

            if (graphQLErrors) {
                graphQLErrors.forEach(graphQLError => {
                    if (
                        graphQLError.extensions &&
                        graphQLError.extensions.code === 'UNAUTHENTICATED'
                    ) {
                        signOut();
                    }
                });
            }
        }),
        networkLink
    ]),
    cache: new InMemoryCache()
});

export default client;
