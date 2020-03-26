"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const command_1 = require("@oclif/command");
const cli_ux_1 = tslib_1.__importDefault(require("cli-ux"));
const open_1 = tslib_1.__importDefault(require("open"));
const client_1 = tslib_1.__importDefault(require("../utils/client"));
const config_1 = tslib_1.__importDefault(require("../utils/config"));
const queries_1 = require("../queries");
const HOST = 'http://localhost:3000';
const POLL_INTERVAL = 3000;
function wait(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
class Login extends command_1.Command {
    async run() {
        const { flags } = this.parse(Login);
        if (config_1.default.get('apiKey') && !flags.force) {
            this.error('You are already signed in. If you want to re-authenticate, pass the `--force` flag.');
        }
        await cli_ux_1.default.anykey('Press any key to begin the login process');
        const keyRequest = await client_1.default.query(queries_1.CreateApiKeyRequest);
        await open_1.default(`${HOST}/grant/${keyRequest.createAPIKeyRequest}`);
        cli_ux_1.default.action.start('Waiting for sign-in...');
        let apiKey = null;
        while (!apiKey) {
            await wait(POLL_INTERVAL);
            const apiKeyResponse = await client_1.default.query(queries_1.GetApiKeyFromRequest, {
                uuid: keyRequest.createAPIKeyRequest,
            });
            apiKey = apiKeyResponse.getAPIKeyFromRequest;
        }
        config_1.default.set('apiKey', apiKey);
        cli_ux_1.default.action.stop();
        this.log('You have been logged in!');
    }
}
exports.default = Login;
Login.description = 'login to your DaaS account';
Login.examples = ['$ daas login'];
Login.flags = {
    force: command_1.flags.boolean({
        default: false,
        description: 'If the user is already signed in, force a new login.',
    }),
};
