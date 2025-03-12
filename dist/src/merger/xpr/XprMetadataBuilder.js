"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const xprErrorMessage_1 = __importDefault(require("./xprErrorMessage"));
const xprRegExp_1 = __importDefault(require("./xprRegExp"));
const XprTokenError_1 = __importDefault(require("./XprTokenError"));
/** トークンからメタデータのみのトークンツリーを作成するクラス */
class XprMetadataBuilder {
    /** トークンの配列 */
    tokens;
    /** 現在のトークン */
    token = null;
    /** includesディレクトリパスの配列 */
    includes = [];
    /** excludesディレクトリパスの配列 */
    excludes = [];
    /**
     * メタデータを解析します。
     * @param tokens トークンの配列
     * @returns ノードの配列、null: エラーが発生した場合
     */
    build(tokens) {
        this.tokens = tokens;
        while (true) {
            this.nextToken();
            // メタデータに何も記述されていない場合、エラー
            if (!this.token) {
                this.error(xprErrorMessage_1.default.GENERAL.MISSING_METADATA);
                return null;
            }
            switch (this.token) {
                // メタデータ
                case '@includes':
                    this.parseIncludes();
                    break;
                case '@excludes':
                    this.parseExcludes();
                    break;
                // メタデータの終わり
                default:
                    // includesの長さが0の場合はエラー
                    if (this.includes.length === 0) {
                        this.error(xprErrorMessage_1.default.GENERAL.MISSING_METADATA);
                        return null;
                    }
                    // ノードトークンを読んでしまっているので、カーソルを前に戻す
                    this.prevToken();
                    return {
                        includes: this.includes,
                        excludes: this.excludes,
                        transKeys: {},
                    };
            }
        }
    }
    parseToken() { }
    /**
     * `@includes`文を解析します。
     * @returns `directory-path[]` includesディレクトリパスの配列
     */
    parseIncludes() {
        /** ディレクトリパスの配列 */
        const directories = this.parseDirectories(xprErrorMessage_1.default.INCLUDES);
        if (!directories)
            return;
        this.includes = directories;
    }
    /**
     * `@excludes`文を解析します。
     * @returns `directory-path[]` excludesディレクトリパスの配列
     */
    parseExcludes() {
        /** ディレクトリパスの配列 */
        const directories = this.parseDirectories(xprErrorMessage_1.default.EXCLUDES);
        if (!directories)
            return;
        this.excludes = directories;
    }
    /**
     * ディレクトリパスの配列を取得します。
     * @param messageGroup エラーメッセージのブロック
     * @returns `directory-path[]` ディレクトリパスの配列
     */
    parseDirectories(messageGroup) {
        this.nextToken();
        // 次のトークンがブロックの始まりでなければエラー
        if (!this.validateToken('{')) {
            this.error(messageGroup.BLOCK_NOT_STARTED);
            return null;
        }
        const directories = [];
        while (true) {
            this.nextToken();
            // 次のトークンがブロックの終わりの場合は終了
            if (this.validateToken('}'))
                break;
            /** ディレクトリパス */
            const directory = this.parseDirectory(messageGroup);
            if (!directory)
                return null;
            directories.push(directory);
        }
        return directories;
    }
    /**
     * 次のディレクトリパスを取得します。
     * @param messageGroup エラーメッセージのブロック
     * @returns 1つのディレクトリパス
     */
    parseDirectory(messageGroup) {
        // 次のトークンがない場合はエラー
        if (!this.token) {
            this.error(messageGroup.MISSING_DIRECTORY);
            return null;
        }
        // 次のトークンが正規表現パターンにマッチしない場合はエラー
        if (!this.validateRegex(xprRegExp_1.default.DIRECTORY_PATH)) {
            this.error(messageGroup.INVALID_FORMAT);
            return null;
        }
        /** ディレクトリパス */
        const directory = this.token;
        this.nextToken();
        // 次のトークンがカンマでない場合はエラー
        if (!this.validateToken(',')) {
            this.error(messageGroup.MISSING_COMMA);
            return null;
        }
        return directory;
    }
    /**
     * 現在のトークンが指定した文字であるかどうかを判定します。
     * @param expectedTokens 期待するトークン
     * @returns true: マッチする場合、false: マッチしない場合
     */
    validateToken(expectedTokens) {
        return this.token === expectedTokens;
    }
    /**
     * 現在のトークンが正規表現パターンにマッチしているかを判定します。
     * @param regex 正規表現パターン
     * @returns true: 正規表現パターンにマッチしている場合、false: マッチしていない場合
     */
    validateRegex(regex) {
        return !!this.token && regex.test(this.token);
    }
    /** 次のトークンをthis.tokenに格納します。 */
    nextToken() {
        this.token = this.tokens.nextToken();
    }
    /** 前のトークンをthis.tokenに格納します。 */
    prevToken() {
        this.token = this.tokens.prevToken();
    }
    /** エラーメッセージを表示します。 */
    error(message) {
        XprTokenError_1.default.show(this.tokens, message);
    }
}
exports.default = XprMetadataBuilder;
