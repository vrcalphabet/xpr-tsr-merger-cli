"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const xprErrorMessage_1 = __importDefault(require("./xprErrorMessage"));
const xprRegExp_1 = __importDefault(require("./xprRegExp"));
const XprTokenError_1 = __importDefault(require("./XprTokenError"));
const XprTokenType_1 = require("./XprTokenType");
/** トークンからノードデータのみのトークンツリーを作成するクラス */
class XprNodeBuilder {
    /** トークンの配列 */
    tokens;
    /** 現在のトークン */
    token = null;
    /**
     * ノードを解析します。
     * @param tokens トークンの配列
     * @returns ノードの配列、null: エラーが発生した場合
     */
    build(tokens) {
        this.tokens = tokens;
        const nodes = { nodes: [] };
        while (true) {
            /** 一つの子ノード、もしくは親ノード */
            const node = this.recursive(false);
            if (!node)
                return null;
            nodes.nodes.push(node);
            const token = this.peekToken();
            if (!token)
                break;
        }
        return nodes;
    }
    /**
     * 再帰的にノードを解析します。
     * @param baseMulti マルチセレクタの初期値
     * @returns ノードの配列、null: エラーが発生した場合
     */
    recursive(baseMulti) {
        /** キーの一時保存用変数 */
        let key = '';
        /** XPathの一時保存用変数 */
        let xpath = '';
        /** マルチセレクタの一時保存用変数 */
        let multi = baseMulti;
        /** 属性名の一時保存用変数 */
        let attribute = null;
        /** カスタムスタイル */
        let custom = null;
        /** ノードの一時保存用変数 */
        const nodes = [];
        while (true) {
            this.nextToken();
            // トークンがない場合、エラー
            if (!this.token) {
                this.error(xprErrorMessage_1.default.GENERAL.INVALID_TOKEN_END);
                return null;
            }
            /** トークンの種類 */
            const type = this.checkType();
            if (type === null)
                return null;
            switch (type) {
                // 通常ノード
                case XprTokenType_1.XprTokenType.KEY:
                    key = this.token;
                    break;
                case XprTokenType_1.XprTokenType.XPATH:
                    xpath = this.token;
                    break;
                case XprTokenType_1.XprTokenType.MULTI:
                    multi = true;
                    break;
                case XprTokenType_1.XprTokenType.ATTRIBUTE:
                    // 属性は[]で囲まれているので、先頭と末尾の文字を削除
                    attribute = this.token.slice(1, -1);
                    break;
                case XprTokenType_1.XprTokenType.CUSTOM:
                    // カスタムスタイルは''で囲まれているので、先頭と末尾の文字を削除
                    custom = ';' + this.token.slice(1, -1);
                    break;
                // 特殊記号
                case XprTokenType_1.XprTokenType.BRACKET_OPEN:
                    if (key || attribute || custom) {
                        this.error(xprErrorMessage_1.default.NODE.KEY_ATTRIBUTE_CUSTOM_ERROR);
                        return null;
                    }
                    while (true) {
                        // 入れ子を探索
                        const node = this.recursive(multi);
                        if (!node)
                            return null;
                        nodes.push(node);
                        // 次のトークンが`}`の場合、XprValueType.BRACKET_CLOSEに移動する
                        const token = this.peekToken();
                        if (token === '}')
                            break;
                    }
                    break;
                case XprTokenType_1.XprTokenType.BRACKET_CLOSE:
                    if (!xpath) {
                        this.error(xprErrorMessage_1.default.NODE.MISSING_XPATH);
                        return null;
                    }
                    if (nodes.length === 0) {
                        this.error(xprErrorMessage_1.default.NODE.MISSING_NODE);
                        return null;
                    }
                    return {
                        xpath: xpath,
                        nodes: nodes,
                    };
                case XprTokenType_1.XprTokenType.COMMA:
                    if (!xpath) {
                        this.error(xprErrorMessage_1.default.NODE.MISSING_XPATH);
                        return null;
                    }
                    if (key === '' && custom === null) {
                        this.error(xprErrorMessage_1.default.NODE.MISSING_KEY);
                        return null;
                    }
                    return {
                        key: key,
                        xpath: xpath,
                        multi: multi,
                        attribute: attribute,
                        custom: custom,
                    };
            }
        }
    }
    /**
     * トークンの種類を取得します。
     * @returns トークンの種類、null: 無効なトークンの場合
     */
    checkType() {
        if (this.validateRegex(xprRegExp_1.default.KEY)) {
            return XprTokenType_1.XprTokenType.KEY;
        }
        if (this.validateRegex(xprRegExp_1.default.XPATH)) {
            return XprTokenType_1.XprTokenType.XPATH;
        }
        if (this.validateRegex(xprRegExp_1.default.MULTI)) {
            return XprTokenType_1.XprTokenType.MULTI;
        }
        if (this.validateRegex(xprRegExp_1.default.ATTRIBUTE)) {
            return XprTokenType_1.XprTokenType.ATTRIBUTE;
        }
        if (this.validateRegex(xprRegExp_1.default.CUSTOM)) {
            return XprTokenType_1.XprTokenType.CUSTOM;
        }
        if (this.validateToken('{')) {
            return XprTokenType_1.XprTokenType.BRACKET_OPEN;
        }
        if (this.validateToken('}')) {
            return XprTokenType_1.XprTokenType.BRACKET_CLOSE;
        }
        if (this.validateToken(',')) {
            return XprTokenType_1.XprTokenType.COMMA;
        }
        this.error(xprErrorMessage_1.default.GENERAL.INVALID_TOKEN);
        return null;
    }
    /**
     * 現在のトークンが指定した文字であるかどうかを判定します。
     * @param expectedTokens 期待するトークン、複数ある場合はいずれかにマッチすればtrue
     * @returns true: マッチする場合、false: マッチしない場合
     */
    validateToken(...expectedTokens) {
        return !!this.token && expectedTokens.includes(this.token);
    }
    /**
     * 現在のトークンが正規表現パターンにマッチしているかを判定します。
     * @param regex 正規表現パターン
     * @returns true: 正規表現パターンにマッチしている場合、false: マッチしていない場合
     */
    validateRegex(regex) {
        return !!this.token && regex.test(this.token);
    }
    /** 次のトークンを取得します。ポインタが移動することはありません。 */
    peekToken() {
        return this.tokens.peekToken();
    }
    /** 次のトークンをthis.tokenに格納します。 */
    nextToken() {
        this.token = this.tokens.nextToken();
    }
    /** エラーメッセージを表示します。 */
    error(message) {
        XprTokenError_1.default.show(this.tokens, message);
    }
}
exports.default = XprNodeBuilder;
