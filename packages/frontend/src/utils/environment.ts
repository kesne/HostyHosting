import {
    Environment,
    Network,
    RecordSource,
    Store,
    Variables,
    RequestParameters,
} from 'relay-runtime';

async function fetchQuery(request: RequestParameters, variables: Variables) {
    const response = await fetch('/api/graphql', {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: request.text,
            variables,
            operationName: request.name,
        }),
    });

    return await response.json();
}

const environment = new Environment({
    network: Network.create(fetchQuery),
    store: new Store(new RecordSource()),
});

export default environment;
