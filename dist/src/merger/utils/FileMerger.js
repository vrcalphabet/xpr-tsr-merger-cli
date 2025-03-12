"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const picocolors_1 = __importDefault(require("picocolors"));
const KeysParser_1 = __importDefault(require("../keys/KeysParser"));
const XprParser_1 = __importDefault(require("../xpr/XprParser"));
const FileManager_1 = __importDefault(require("./FileManager"));
class FileMerger {
    static xprFile = 'rule.xpr';
    static keysFile = 'keys.json';
    static merge(dirPath) {
        const xprPath = path_1.default.join(dirPath, this.xprFile);
        const keysPath = path_1.default.join(dirPath, this.keysFile);
        const xpr = FileManager_1.default.readFile(xprPath);
        const keys = FileManager_1.default.readFile(keysPath);
        if (!xpr || !keys) {
            console.log(picocolors_1.default.red(`ディレクトリ ${path_1.default.basename(dirPath)} に "rule.xpr" または "keys.json" が存在しません。`));
            return null;
        }
        console.log(`${picocolors_1.default.yellow('パース中')}:`, xprPath);
        const xprTree = XprParser_1.default.parse(xpr);
        if (!xprTree)
            return null;
        console.log(`${picocolors_1.default.yellow('パース中')}:`, keysPath);
        const keysTree = KeysParser_1.default.parse(keys);
        if (!keysTree)
            return null;
        return Object.assign(xprTree, { keys: keysTree });
    }
}
exports.default = FileMerger;
