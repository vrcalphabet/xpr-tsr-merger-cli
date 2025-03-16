"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = merge;
const path_1 = __importDefault(require("path"));
const picocolors_1 = __importDefault(require("picocolors"));
const utils_1 = require("../utils");
const FileManager_1 = __importDefault(require("../utils/FileManager"));
const FileMerger_1 = __importDefault(require("./common/FileMerger"));
const TsrParser_1 = __importDefault(require("./tsr/TsrParser"));
async function merge(input, output) {
    const xprResult = [];
    const directories = FileManager_1.default.directories(input);
    for (const dir of directories) {
        const mergedContent = await FileMerger_1.default.merge(path_1.default.join(input, dir));
        if (!mergedContent)
            return false;
        xprResult.push(mergedContent);
    }
    const tsrPath = path_1.default.join(input, 'trans.json');
    const tsr = FileManager_1.default.readFile(tsrPath);
    if (!tsr) {
        console.log(picocolors_1.default.red('入力フォルダに "trans.json" が存在しません。'));
        return false;
    }
    console.log(`${picocolors_1.default.yellow('パース中')}:`, tsrPath);
    const tsrResult = TsrParser_1.default.parse(tsr);
    if (!tsrResult)
        return false;
    await (0, utils_1.wait)(100);
    (0, utils_1.eraseUp)();
    console.log(`${picocolors_1.default.greenBright('パース完了')}:`, tsrPath);
    const xprTsr = {
        rules: xprResult,
        trans: tsrResult,
    };
    const dataPath = path_1.default.join(output, 'data.json');
    const lastUpdatePath = path_1.default.join(output, 'lastUpdate.txt');
    const timestamp = Date.now().toString();
    FileManager_1.default.writeFile(dataPath, JSON.stringify(xprTsr));
    FileManager_1.default.writeFile(lastUpdatePath, timestamp);
    return true;
}
