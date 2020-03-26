"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const command_1 = require("@oclif/command");
const cli_ux_1 = tslib_1.__importDefault(require("cli-ux"));
const config_1 = tslib_1.__importDefault(require("../utils/config"));
class Logout extends command_1.Command {
    async run() {
        const confirm = await cli_ux_1.default.confirm('Signing out will prevent you from managing your applications with the CLI. Are you sure you wish to continue?');
        if (!confirm) {
            return;
        }
        config_1.default.delete('apiKey');
        this.log('You have been signed out.');
    }
}
exports.default = Logout;
Logout.description = 'logout of your DaaS account';
Logout.examples = ['$ daas logout'];
