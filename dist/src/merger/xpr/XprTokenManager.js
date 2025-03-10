"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** トークンを格納し、順次アクセスを可能にするクラス */
class XprTokenManager {
    tokens;
    index;
    constructor() {
        this.tokens = [];
        this.index = -1;
    }
    /**
     * トークンを格納します。
     * @param token 格納するトークン
     */
    add(...token) {
        this.tokens.push(...token);
    }
    /**
     * ポインタを移動せずに次のトークンを取得します。
     * @returns 次のトークンで、無い場合はnull
     */
    peekToken() {
        // 配列の範囲外にポインタが当たっている場合
        if (this.index <= 0 || this.index >= this.tokens.length - 1) {
            return null;
        }
        return this.tokens[this.index + 1];
    }
    /**
     * 次のトークンを取得します。
     * @returns 次のトークンで、無い場合はnull
     */
    nextToken() {
        // 配列の範囲外にポインタが当たっている場合
        if (this.index >= this.tokens.length - 1) {
            return null;
        }
        return this.tokens[++this.index];
    }
    /**
     * 前のトークンを取得します。
     * @return 前のトークンで、無い場合はnull
     */
    prevToken() {
        // 配列の範囲外にポインタが当たっている場合
        if (this.index <= 0) {
            return null;
        }
        return this.tokens[--this.index];
    }
    getTokens() {
        return this.tokens;
    }
    getIndex() {
        return this.index;
    }
}
exports.default = XprTokenManager;
