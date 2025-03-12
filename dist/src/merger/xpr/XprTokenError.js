"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const picocolors_1 = __importDefault(require("picocolors"));
class XprTokenError {
    static show(tokens, message) {
        const slicedTokens = this.sliceTokens(tokens.getTokens(), tokens.getIndex(), 5);
        console.log(picocolors_1.default.red(`XPR解析エラー: ${message}`));
        console.log(picocolors_1.default.red(slicedTokens.join(' ')));
    }
    static sliceTokens(tokens, index, offset) {
        tokens[index] = `>>> ${tokens[index]} <<<`;
        const left = Math.max(0, index - offset);
        const right = Math.min(tokens.length, index + offset);
        return tokens.slice(left, right);
    }
}
exports.default = XprTokenError;
