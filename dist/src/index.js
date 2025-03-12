"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = index;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const picocolors_1 = __importDefault(require("picocolors"));
const merge_1 = __importDefault(require("./merger/merge"));
const Watcher_1 = __importDefault(require("./Watcher"));
function index(input, output) {
    console.log('xpr+tsrマージシステム:', picocolors_1.default.green(`v${process.env.npm_package_version}`));
    console.log();
    const inputPath = path_1.default.resolve(process.cwd(), input);
    const outputPath = path_1.default.resolve(process.cwd(), output);
    if (input === output) {
        console.log(picocolors_1.default.red('入力フォルダと出力フォルダが同じです。'));
        process.exit(1);
    }
    if (!fs_1.default.existsSync(inputPath)) {
        console.log(picocolors_1.default.red('入力フォルダが存在しません。'));
        process.exit(1);
    }
    console.log(`${picocolors_1.default.blue('入力フォルダ')}:`, inputPath);
    console.log(`${picocolors_1.default.blue('出力フォルダ')}:`, outputPath);
    console.log();
    const watcher = new Watcher_1.default();
    console.log('フォルダ監視中...');
    watcher.watch(inputPath, () => {
        console.clear();
        console.log('ファイルが変更されました。');
        if ((0, merge_1.default)(inputPath, outputPath)) {
            console.log('マージが完了しました。');
        }
        console.log('フォルダ監視中...');
    });
}
