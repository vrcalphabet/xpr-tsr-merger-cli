"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class KeysParser {
    static parse(keys) {
        try {
            const keysObj = JSON.parse(keys);
            this.recursive(keysObj);
            return keysObj;
        }
        catch (e) {
            console.error('"keys.json" のパースに失敗しました。有効なJSON形式ではありません。');
            return null;
        }
    }
    static recursive(tsr) {
        for (const prop in tsr) {
            if (typeof tsr[prop] === 'string') {
                const source = prop.trim().toLowerCase();
                const trans = tsr[prop];
                delete tsr[prop];
                tsr[source] = trans;
            }
            else {
                this.recursive(tsr[prop]);
            }
        }
    }
}
exports.default = KeysParser;
