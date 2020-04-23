import { Program } from '@boost/cli';
import pkg from '../package.json';
import LoginCommand from './commands/LoginCommand';
import LogoutCommand from './commands/LogoutCommand';
import ConfigCommand from './commands/ConfigCommand';

const program = new Program({
    bin: 'hh',
    footer: 'Documentation: https://hostyhosting.com/cli',
    name: 'HostyHosting',
    version: pkg.version,
});

program
    .register(new LoginCommand())
    .register(new LogoutCommand())
    .register(new ConfigCommand())
    .runAndExit(process.argv.slice(2));
