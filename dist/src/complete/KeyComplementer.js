"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class KeyComplementer {
    static transKeys;
    static complete(transKeys, keys) {
        this.transKeys = transKeys;
        for (const key of keys) {
            this.create(key.split('.'));
        }
        return this.transKeys;
    }
    static create(key) {
        let temp = this.transKeys;
        for (const k of key) {
            if (typeof temp[k] === 'string')
                return;
            if (!(k in temp)) {
                temp[k] = {};
            }
            temp = temp[k];
        }
    }
}
exports.default = KeyComplementer;
