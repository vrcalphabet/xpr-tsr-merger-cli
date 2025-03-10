#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import index from '../src/index';

yargs(hideBin(process.argv))
  .usage('使い方: npx merger [オプション]')
  .command(
    '$0',
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
      index(argv.input, argv.output);
    }
  )
  .help().argv;
