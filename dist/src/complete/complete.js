"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = complete;
const path_1 = __importDefault(require("path"));
const picocolors_1 = __importDefault(require("picocolors"));
const TsrParser_1 = __importDefault(require("../merger/tsr/TsrParser"));
const utils_1 = require("../utils");
const FileManager_1 = __importDefault(require("../utils/FileManager"));
const FileComplementer_1 = __importDefault(require("./FileComplementer"));
const KeyComplementer_1 = __importDefault(require("./KeyComplementer"));
async function complete(input) {
    const allKeys = [];
    const directories = FileManager_1.default.directories(input);
    for (const dir of directories) {
        const success = await FileComplementer_1.default.complete(path_1.default.join(input, dir), allKeys);
        if (!success)
            return;
    }
    const tsrPath = path_1.default.join(input, 'trans.json');
    const tsr = FileManager_1.default.readFile(tsrPath);
    console.log(`${picocolors_1.default.yellow('パース中')}:`, tsrPath);
    const tsrResult = TsrParser_1.default.parse(tsr ?? '{}');
    if (!tsrResult)
        return;
    const beforeJSON = JSON.stringify(tsrResult);
    const completedTsr = KeyComplementer_1.default.complete(tsrResult, allKeys, true);
    const afterJSON = JSON.stringify(completedTsr);
    await (0, utils_1.wait)(100);
    (0, utils_1.eraseUp)();
    console.log(`${picocolors_1.default.greenBright('パース完了')}:`, tsrPath, beforeJSON !== afterJSON ? '[補完]' : '');
    console.log(tsrResult === completedTsr);
    FileManager_1.default.writeFile(tsrPath, JSON.stringify(completedTsr, null, 2));
}
