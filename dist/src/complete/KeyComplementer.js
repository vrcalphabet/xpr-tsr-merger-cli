"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class KeyComplementer {
    static transKeys;
    static complete(transKeys, keys, completeString) {
        this.transKeys = transKeys;
        for (const key of keys) {
            this.create(key.split('.'), completeString);
        }
        return this.transKeys;
    }
    static create(key, completeString) {
        let temp = this.transKeys;
        for (const [i, k] of key.entries()) {
            if (typeof temp[k] === 'string')
                return;
            if (!(k in temp)) {
                if (completeString && key.length === i + 1) {
                    temp[k] = "__________";
                    return;
                }
                else {
                    temp[k] = {};
                }
            }
            temp = temp[k];
        }
    }
}
exports.default = KeyComplementer;
