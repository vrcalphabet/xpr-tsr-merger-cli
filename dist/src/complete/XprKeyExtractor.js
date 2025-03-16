"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class XprKeyExtractor {
    static keys;
    static extract(xpr) {
        this.keys = [];
        this.extractKeys(xpr);
        return this.keys;
    }
    static extractKeys(xpr) {
        this.recursiveNodes(xpr.nodes);
    }
    static recursiveNodes(nodes) {
        for (const node of nodes) {
            this.recursiveNode(node);
        }
    }
    static recursiveNode(node) {
        if ('key' in node) {
            this.keys.push(node.key);
        }
        else {
            this.recursiveNodes(node.nodes);
        }
    }
}
exports.default = XprKeyExtractor;
