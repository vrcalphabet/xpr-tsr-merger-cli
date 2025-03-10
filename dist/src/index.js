"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = index;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Watcher_1 = __importDefault(require("./Watcher"));
const merge_1 = __importDefault(require("./merger/merge"));
function index(input, output) {
    console.log('xpr+tsrマージシステム: v' + process.env.npm_package_version);
    console.log();
    const inputPath = path_1.default.resolve(process.cwd(), input);
    const outputPath = path_1.default.resolve(process.cwd(), output);
    if (input === output) {
        console.error('入力フォルダと出力フォルダが同じです。');
        process.exit(1);
    }
    if (!fs_1.default.existsSync(inputPath)) {
        console.error('入力フォルダが存在しません。');
        process.exit(1);
    }
    console.log('入力フォルダ:', inputPath);
    console.log('出力フォルダ:', outputPath);
    console.log('フォルダ監視中...');
    const watcher = new Watcher_1.default();
    watcher.watch(inputPath, () => {
        console.log('ファイルが変更されました。');
        (0, merge_1.default)(inputPath, outputPath);
    });
}
