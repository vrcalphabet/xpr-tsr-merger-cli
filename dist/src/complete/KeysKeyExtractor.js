"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class KeysKeyExtractor {
    static keys;
    static extract(keys) {
        this.keys = [];
        this.recursiveKeys(keys, []);
        return this.keys;
    }
    static recursiveKeys(keys, keyStack) {
        for (const key in keys) {
            if (typeof keys[key] === 'string') {
                this.keys.push([...keyStack, keys[key]].join('.'));
            }
            else {
                keyStack.push(key);
                this.recursiveKeys(keys[key], keyStack);
                keyStack.pop();
            }
        }
    }
}
exports.default = KeysKeyExtractor;
