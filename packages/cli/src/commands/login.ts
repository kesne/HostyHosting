import { Command, flags } from '@oclif/command';
import cli from 'cli-ux';
import open from 'open';
import client from '../utils/client';
import config from '../utils/config';
import {
    CreateApiKeyRequest,
    CreateApiKeyRequestMutation,
    GetApiKeyFromRequest,
    GetApiKeyFromRequestQuery,
    GetApiKeyFromRequestQueryVariables,
} from '../queries';

const HOST = 'http://localhost:3000';
const POLL_INTERVAL = 3000;

function wait(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
}

export default class Login extends Command {
    static description = 'login to your HostyHosting account';

    static examples = ['$ hh login'];

    static flags = {
        force: flags.boolean({
            default: false,
            description: 'If the user is already signed in, force a new login.',
        }),
    };

    async run() {
        const { flags } = this.parse(Login);

        if (config.get('apiKey') && !flags.force) {
            this.error(
                'You are already signed in. If you want to re-authenticate, pass the `--force` flag.',
            );
        }

        await cli.anykey('Press any key to begin the login process');

        const keyRequest = await client.query<CreateApiKeyRequestMutation>(CreateApiKeyRequest);
        await open(`${HOST}/grant/${keyRequest.createAPIKeyRequest}`);

        cli.action.start('Waiting for sign-in...');

        let apiKey = null;
        while (!apiKey) {
            await wait(POLL_INTERVAL);
            const apiKeyResponse = await client.query<
                GetApiKeyFromRequestQuery,
                GetApiKeyFromRequestQueryVariables
            >(GetApiKeyFromRequest, {
                uuid: keyRequest.createAPIKeyRequest,
            });

            apiKey = apiKeyResponse.getAPIKeyFromRequest;
        }

        config.set('apiKey', apiKey);
        cli.action.stop();

        this.log('You have been logged in!');
    }
}
