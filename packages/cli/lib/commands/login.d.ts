import { Command } from '@oclif/command';
export default class Login extends Command {
    static description: string;
    static examples: string[];
    static flags: {
        force: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
    };
    run(): Promise<void>;
}
