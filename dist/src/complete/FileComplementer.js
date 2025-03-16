"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const picocolors_1 = __importDefault(require("picocolors"));
const XprParser_1 = __importDefault(require("../merger/xpr/XprParser"));
const utils_1 = require("../utils");
const FileManager_1 = __importDefault(require("../utils/FileManager"));
const KeyComplementer_1 = __importDefault(require("./KeyComplementer"));
const KeysParser_1 = __importDefault(require("./KeysParser"));
const XprKeyExtractor_1 = __importDefault(require("./XprKeyExtractor"));
class FileComplementer {
    static xprFile = 'rule.xpr';
    static keysFile = 'keys.json';
    static async complete(dirPath) {
        const xprPath = path_1.default.join(dirPath, this.xprFile);
        const keysPath = path_1.default.join(dirPath, this.keysFile);
        const xpr = FileManager_1.default.readFile(xprPath);
        const keys = FileManager_1.default.readFile(keysPath);
        if (!xpr) {
            console.log(picocolors_1.default.red(`ディレクトリ ${path_1.default.basename(dirPath)} に "rule.xpr" が存在しません。`));
            return false;
        }
        console.log(`${picocolors_1.default.yellow('パース中')}:`, xprPath);
        const xprTree = XprParser_1.default.parse(xpr);
        if (!xprTree)
            return false;
        const xprKeys = XprKeyExtractor_1.default.extract(xprTree);
        await (0, utils_1.wait)(100);
        (0, utils_1.eraseUp)();
        console.log(`${picocolors_1.default.greenBright('パース完了')}:`, xprPath);
        console.log(`${picocolors_1.default.yellow('パース中')}:`, keysPath);
        const keysTree = KeysParser_1.default.parse(keys);
        if (!keysTree)
            return false;
        const completedKeys = KeyComplementer_1.default.complete(keysTree, xprKeys);
        const beforeJSON = JSON.stringify(JSON.parse(keys ?? '{}'));
        const afterJSON = JSON.stringify(completedKeys);
        await (0, utils_1.wait)(100);
        (0, utils_1.eraseUp)();
        console.log(`${picocolors_1.default.greenBright('パース完了')}:`, keysPath, beforeJSON !== afterJSON ? '[補完]' : '');
        FileManager_1.default.writeFile(keysPath, JSON.stringify(completedKeys, null, 2));
        return true;
    }
}
exports.default = FileComplementer;
