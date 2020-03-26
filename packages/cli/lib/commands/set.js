"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const command_1 = tslib_1.__importDefault(require("@oclif/command"));
const config_1 = tslib_1.__importStar(require("../utils/config"));
class Set extends command_1.default {
    async run() {
        const { args } = this.parse(Set);
        if (!(args.key in config_1.ConfigOptions)) {
            this.error('Unknown configuration key.');
        }
        if (!args.value) {
            config_1.default.delete(args.key);
        }
        else {
            config_1.default.set(args.key, args.value);
        }
    }
}
exports.default = Set;
Set.args = [
    {
        name: 'key',
        description: 'The configuration key that you wish to set.',
        required: true,
        options: Object.keys(config_1.ConfigOptions),
    },
    {
        name: 'value',
        description: 'The value you wish to set the configuration to. If not provided, we will delete the configuration.',
    },
];
