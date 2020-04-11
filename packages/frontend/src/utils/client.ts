import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { signOut, checkCookies } from './user';

const httpLink = new HttpLink({
    uri: '/api/graphql',
    credentials: 'include',
    // TODO: Replace this custom fetch cookie logic with a custom link:
    fetch: (input: RequestInfo, init?: RequestInit) =>
        fetch(input, init).then(res => {
            if (checkCookies()) {
                client.cache.reset();
            }
            return res;
        }),
});

const client = new ApolloClient({
    link: ApolloLink.from([
        onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors)
                graphQLErrors.forEach(({ message, locations, path }) =>
                    console.log(
                        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                    ),
                );
            if (networkError) console.log(`[Network error]: ${networkError}`);

            // TODO: This isn't actually working:
            // TODO: When this happens we should destroy the session on the backend as well.
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
        httpLink,
    ]),
    cache: new InMemoryCache(),
});

export default client;
