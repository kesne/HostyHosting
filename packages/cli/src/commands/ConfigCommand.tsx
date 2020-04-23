import config, { ConfigOptions } from '../config';
import { Arg, Command, Config } from '@boost/cli';

const VALID_CONFIG_KEYS = Object.keys(ConfigOptions);

@Config('config', 'set configuration for the CLI')
export default class ConfigCommand extends Command {
    @Arg.Params(
        {
            description: 'The configuration key that you wish to set.',
            label: 'key',
            required: true,
            type: 'string',
            validate(key) {
                if (!VALID_CONFIG_KEYS.includes(key)) {
                    throw new Error(
                        `Configuration key must be one of: ${VALID_CONFIG_KEYS.join(', ')}`,
                    );
                }
            },
        },
        {
            description:
                'The value you wish to set the configuration to. If not provided, we will delete the configuration.',
            label: 'value',
            type: 'string',
        },
    )
    async run(key: keyof typeof ConfigOptions, value?: string) {
        if (!value) {
            config.delete(key);
        } else {
            config.set(key, value);
        }
        this.log(`Updated configuration "${key}".`);
    }
}
