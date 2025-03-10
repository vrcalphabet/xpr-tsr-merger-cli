import fs from 'fs';
import path from 'path';
import Watcher from './Watcher';
import merge from './merger/merge';

export default function index(input: string, output: string) {
  console.log('xpr+tsrマージシステム: v' + process.env.npm_package_version);
  console.log();

  const inputPath = path.resolve(process.cwd(), input);
  const outputPath = path.resolve(process.cwd(), output);

  if (input === output) {
    console.error('入力フォルダと出力フォルダが同じです。');
    process.exit(1);
  }

  if (!fs.existsSync(inputPath)) {
    console.error('入力フォルダが存在しません。');
    process.exit(1);
  }

  console.log('入力フォルダ:', inputPath);
  console.log('出力フォルダ:', outputPath);
  console.log('フォルダ監視中...');

  const watcher = new Watcher();
  watcher.watch(inputPath, () => {
    console.log('ファイルが変更されました。');
    merge(inputPath, outputPath);
  });
}
