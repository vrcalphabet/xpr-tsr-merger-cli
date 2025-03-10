#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
const index_1 = __importDefault(require("../src/index"));
(0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
    .usage('使い方: npx merger [オプション]')
    .command('$0', 'ファイルをマージする', (yargs) => yargs
    .option('input', {
    type: 'string',
    alias: 'i',
    describe: '入力フォルダ',
    default: 'src',
})
    .option('output', {
    type: 'string',
    alias: 'o',
    describe: '出力フォルダ',
    default: 'dist',
}), (argv) => {
    (0, index_1.default)(argv.input, argv.output);
})
    .help().argv;
