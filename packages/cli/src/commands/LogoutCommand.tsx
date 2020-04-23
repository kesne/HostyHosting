import config from '../config';
import { Config, Command } from '@boost/cli';

@Config('logout', 'logout of your HostyHosting account', {
    aliases: ['signout']
})
export default class LogoutCommand extends Command {
    async run() {
        // TODO: At some point we might want some user confirmation:
        // const confirm = await cli.confirm(
        //     'Signing out will prevent you from managing your applications with the CLI. Are you sure you wish to continue?',
        // );

        config.delete('apiKey');

        this.log('You have been signed out.');
    }
}
