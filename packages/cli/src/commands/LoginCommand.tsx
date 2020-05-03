import React, { useEffect, useRef } from 'react';
import { Command, Config, Box, Arg, GlobalOptions } from '@boost/cli';
import open from 'open';
import Provider from './helpers/Provider';
import { useCreateApiKeyRequestMutation, useGetApiKeyFromRequestQuery } from '../queries';
import config from '../config';
import { HOST } from '../constants';

const POLL_INTERVAL = 3000;

function WaitForAPIKey({ uuid }: { uuid: string }) {
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const { data, refetch } = useGetApiKeyFromRequestQuery({
        variables: {
            uuid,
        },
    });

    function stopPolling() {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            refetch();
        }, POLL_INTERVAL);

        return () => {
            stopPolling();
        };
    }, []);

    useEffect(() => {
        if (data?.getAPIKeyFromRequest) {
            stopPolling();
            config.set('apiKey', data.getAPIKeyFromRequest);
        }
    }, [data]);

    if (!data?.getAPIKeyFromRequest) {
        return <Box>Opening your browser to complete sign-in...</Box>;
    }

    return <Box>You have been logged in!</Box>;
}

function Login() {
    const [createAPIKeyRequest, { data, loading }] = useCreateApiKeyRequestMutation();

    useEffect(() => {
        createAPIKeyRequest();
    }, []);

    useEffect(() => {
        if (!data) return;

        open(`${HOST}/grant/${data.createAPIKeyRequest}`);
    }, [data]);

    if (!data || loading) {
        return <Box>Logging in...</Box>;
    }

    return <WaitForAPIKey uuid={data.createAPIKeyRequest} />;
}

@Config('login', 'login to your HostyHosting account', {
    aliases: ['signin'],
})
export default class LoginCommand extends Command {
    @Arg.Flag('If the user is already signed in, force a new login.')
    force: boolean = false;

    async run() {
        if (config.get('apiKey') && !this.force) {
            this.exit(
                'You are already signed in. If you want to re-authenticate, pass the `--force` flag.',
            );
        }

        return (
            <Provider>
                <Login />
            </Provider>
        );
    }
}
