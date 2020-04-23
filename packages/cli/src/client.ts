import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import fetch from 'node-fetch';

const httpLink = new HttpLink({
    uri: 'http://localhost:1337/api/graphql',
    // @ts-ignore
    fetch

    // NOTE: This is really useful to debug network traffic:
    // fetch(...args) {
    //     // @ts-ignore
    //     return fetch(...args).then(res => {
    //         const resToProvide = res.clone();

    //         return res.text().then((text: string) => {
    //             console.log(text);
    //             return resToProvide;
    //         });
    //     });
    // },
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

export default client;
