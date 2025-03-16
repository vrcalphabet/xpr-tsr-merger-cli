"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = index;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const picocolors_1 = __importDefault(require("picocolors"));
const complete_1 = __importDefault(require("./complete"));
async function index(input) {
    console.clear();
    console.log('翻訳キー補完システム:', picocolors_1.default.green(`v${process.env.npm_package_version}`));
    console.log();
    const inputPath = path_1.default.resolve(process.cwd(), input);
    if (!fs_1.default.existsSync(inputPath)) {
        console.log(picocolors_1.default.red('入力フォルダが存在しません。'));
        process.exit(1);
    }
    console.log(`${picocolors_1.default.blue('入力フォルダ')}:`, inputPath);
    console.log();
    console.log('翻訳キー補完中...');
    await (0, complete_1.default)(inputPath);
    console.log('補完が完了しました。');
}
