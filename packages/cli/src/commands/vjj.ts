import { Command } from '@oclif/command';

export default class VJJ extends Command {
    static hidden = true;

    async run() {
        this.log(
            "This CLI was hand-crafted by the Vape God himself. Don't forget to like and subscribe: https://twitch.tv/VapeJuiceJordan",
        );
    }
}
