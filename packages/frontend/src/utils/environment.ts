import { Environment, Network, RecordSource, Store } from 'relay-runtime';

function fetchQuery(operation, variables) {
    return fetch('/api/graphql', {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: operation.text,
            variables,
        }),
    }).then(response => {
        return response.json();
    });
}

const store = new Store(new RecordSource());

const environment = new Environment({
    network: Network.create(fetchQuery),
    store,
});

global.store = store;

export default environment;
