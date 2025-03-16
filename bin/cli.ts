#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import complete from '../src/complete';
import merger from '../src/merger';

yargs(hideBin(process.argv))
  .usage('使い方: npx merger [コマンド] [オプション]')
  .command(
    'watch',
    'ファイルをマージする',
    (yargs) =>
      yargs
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
        }),
    (argv) => {
      merger(argv.input, argv.output);
    }
  )
  .command(
    'complete',
    '翻訳キーを補完する',
    (yargs) =>
      yargs.option('input', {
        type: 'string',
        alisa: 'i',
        describe: '入力フォルダ',
        default: 'src',
      }),
    (argv) => {
      complete(argv.input);
    }
  )
  .help().argv;
