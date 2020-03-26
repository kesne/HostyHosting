import Command from '@oclif/command';
import config, { ConfigOptions } from '../utils/config';

export default class Set extends Command {
    static args = [
        {
            name: 'key',
            description: 'The configuration key that you wish to set.',
            required: true,
            options: Object.keys(ConfigOptions),
        },
        {
            name: 'value',
            description:
                'The value you wish to set the configuration to. If not provided, we will delete the configuration.',
        },
    ];

    async run() {
        const { args } = this.parse(Set);
        if (!(args.key in ConfigOptions)) {
            this.error('Unknown configuration key.');
        }

        if (!args.value) {
            config.delete(args.key);
        } else {
            config.set(args.key, args.value)
        }
    }
}
