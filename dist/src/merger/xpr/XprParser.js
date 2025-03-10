"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const XprBuilder_1 = __importDefault(require("./XprBuilder"));
const XprTokenizer_1 = __importDefault(require("./XprTokenizer"));
class XprParser {
    static parse(filePath, xpr) {
        const tokens = XprTokenizer_1.default.tokenize(xpr);
        return XprBuilder_1.default.build(tokens);
    }
}
exports.default = XprParser;
