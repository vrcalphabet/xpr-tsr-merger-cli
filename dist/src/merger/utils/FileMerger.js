"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const FileManager_1 = __importDefault(require("./FileManager"));
const XprParser_1 = __importDefault(require("../xpr/XprParser"));
class FileMerger {
    static merge(dirPath) {
        const xprPath = path_1.default.join(dirPath, 'rule.xpr');
        const keysPath = path_1.default.join(dirPath, 'keys.json');
        const xpr = FileManager_1.default.readFile(xprPath);
        const keys = FileManager_1.default.readFile(keysPath);
        if (!xpr || !keys) {
            console.error(`ディレクトリ ${path_1.default.basename(dirPath)} に rule.xpr または keys.json が存在しません。`);
            return null;
        }
        console.log(JSON.stringify(XprParser_1.default.parse(xprPath, xpr)));
    }
}
exports.default = FileMerger;
