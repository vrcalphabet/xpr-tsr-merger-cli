"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const xprRegExp_1 = __importDefault(require("./xprRegExp"));
const XprTokenManager_1 = __importDefault(require("./XprTokenManager"));
/** xpr形式の文字列をトークンに分割するためのクラス */
class XprTokenizer {
    /**
     * 入力された文字列をトークンに分割します。
     * @param input トークン化する入力文字列
     * @returns トークンの配列
     */
    static tokenize(input) {
        /** コメントを除去したinput */
        const strippedInput = input.replaceAll(xprRegExp_1.default.COMMENT, '');
        /** 1行ごとに分割されたinput */
        const lines = strippedInput.split(/\n/);
        /** トークンの配列 */
        const tokens = new XprTokenManager_1.default();
        lines.forEach((line) => {
            // 空行の場合はスキップ
            if (line.trim().length === 0) {
                return;
            }
            /** 空白区切りのトークンに分割 */
            const splittedTokens = line.trim().split(/\s+/);
            tokens.add(...splittedTokens);
            // ネスト記号が含まれていない場合（ブロック内のノードの場合）
            if (!splittedTokens.includes('{') && !splittedTokens.includes('}')) {
                // 行の区切りを表す記号を追加
                tokens.add(',');
            }
        });
        return tokens;
    }
}
exports.default = XprTokenizer;
