"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class KeysParser {
    static parse(keys) {
        if (!keys)
            return {};
        try {
            const keysObj = JSON.parse(keys);
            return keysObj;
        }
        catch (e) {
            console.error('"keys.json" のパースに失敗しました。有効なJSON形式ではありません。');
            return null;
        }
    }
}
exports.default = KeysParser;
