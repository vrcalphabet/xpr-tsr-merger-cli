import fs from 'fs';
import path from 'path';
import pc from 'picocolors';
import merge from './merger/merge';
import Watcher from './Watcher';

export default function index(input: string, output: string) {
  console.log('xpr+tsrマージシステム:', pc.green(`v${process.env.npm_package_version}`));
  console.log();

  const inputPath = path.resolve(process.cwd(), input);
  const outputPath = path.resolve(process.cwd(), output);

  if (input === output) {
    console.log(pc.red('入力フォルダと出力フォルダが同じです。'));
    process.exit(1);
  }

  if (!fs.existsSync(inputPath)) {
    console.log(pc.red('入力フォルダが存在しません。'));
    process.exit(1);
  }

  console.log(`${pc.blue('入力フォルダ')}:`, inputPath);
  console.log(`${pc.blue('出力フォルダ')}:`, outputPath);
  console.log();

  const watcher = new Watcher();
  console.log('フォルダ監視中...');

  watcher.watch(inputPath, () => {
    console.clear();
    console.log('ファイルが変更されました。');
    if (merge(inputPath, outputPath)) {
      console.log('マージが完了しました。');
    }
    console.log('フォルダ監視中...');
  });
}
