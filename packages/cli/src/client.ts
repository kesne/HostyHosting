import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import fetch from 'node-fetch';
import { HOST } from './constants';

const httpLink = new HttpLink({
    uri: `${HOST}/api/graphql`,
    // @ts-ignore: The node-fetch types are incompatible with the DOM fetch:
    fetch,

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
