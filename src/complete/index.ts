import fs from 'fs';
import path from 'path';
import pc from 'picocolors';
import complete from './complete';

export default async function index(input: string): Promise<void> {
  console.clear();
  console.log('翻訳キー補完システム:', pc.green(`v${process.env.npm_package_version}`));
  console.log();
  
  const inputPath = path.resolve(process.cwd(), input);
  
  if (!fs.existsSync(inputPath)) {
    console.log(pc.red('入力フォルダが存在しません。'));
    process.exit(1);
  }
  
  console.log(`${pc.blue('入力フォルダ')}:`, inputPath);
  console.log();
  
  console.log('翻訳キー補完中...');
  await complete(inputPath);
  
  console.log('補完が完了しました。');
}