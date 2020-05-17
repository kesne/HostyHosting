import {
    Environment,
    Network,
    RecordSource,
    Store,
    Variables,
    RequestParameters,
} from 'relay-runtime';
import { checkCookies } from './user';

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

    // If the user state has changed, then we need to reset the apollo cache:
    if (checkCookies()) {
        // TODO: Reset relay store here.
    }

    return await response.json();
}

// TODO: Re-create the environment when the user session changes.
const environment = new Environment({
    network: Network.create(fetchQuery),
    store: new Store(new RecordSource()),
});

export default environment;
