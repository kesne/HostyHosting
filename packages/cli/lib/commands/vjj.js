"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
class VJJ extends command_1.Command {
    async run() {
        this.log("This CLI was hand-crafted by the Vape God himself. Don't forget to like and subscribe: https://twitch.tv/VapeJuiceJordan");
    }
}
exports.default = VJJ;
VJJ.hidden = true;
