"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const language_1 = require("graphql/language");
class Client {
    constructor() {
        this.endpoint = 'http://localhost:3000/api/graphql';
    }
    async query(query, variables) {
        const res = await axios_1.default.post(this.endpoint, {
            query: language_1.print(query),
            variables,
        });
        return res.data.data;
    }
}
exports.default = new Client();
