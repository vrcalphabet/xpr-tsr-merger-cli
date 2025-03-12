"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TsrParser {
    static parse(keys) {
        try {
            const tsrObj = JSON.parse(keys);
            return tsrObj;
        }
        catch (e) {
            console.error('"trans.json" のパースに失敗しました。有効なJSON形式ではありません。');
            return null;
        }
    }
}
exports.default = TsrParser;
