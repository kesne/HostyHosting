import { Command } from '@oclif/command';
import cli from 'cli-ux';
import config from '../utils/config';

export default class Logout extends Command {
    static description = 'logout of your HostyHosting account';

    static examples = ['$ hh logout'];

    async run() {
        const confirm = await cli.confirm(
            'Signing out will prevent you from managing your applications with the CLI. Are you sure you wish to continue?',
        );

        if (!confirm) {
            return;
        }

        config.delete('apiKey');

        this.log('You have been signed out.');
    }
}
