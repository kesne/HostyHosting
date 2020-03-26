import Command from '@oclif/command';
export default class Set extends Command {
    static args: ({
        name: string;
        description: string;
        required: boolean;
        options: string[];
    } | {
        name: string;
        description: string;
        required?: undefined;
        options?: undefined;
    })[];
    run(): Promise<void>;
}
