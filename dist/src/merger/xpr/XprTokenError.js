"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class XprTokenError {
    static show(tokens, message) {
        const slicedTokens = this.sliceTokens(tokens.getTokens(), tokens.getIndex(), 5);
        console.error(`XPR解析エラー: ${message}`);
        console.error(`${slicedTokens.join(' ')}`);
    }
    static sliceTokens(tokens, index, offset) {
        tokens[index] = `【${tokens[index]}】`;
        const left = Math.max(0, index - offset);
        const right = Math.min(tokens.length, index + offset);
        return tokens.slice(left, right);
    }
}
exports.default = XprTokenError;
