import path from 'path';
import pc from 'picocolors';
import { eraseUp, wait } from '../utils';
import FileManager from '../utils/FileManager';
import FileMerger from './common/FileMerger';
import { Xpr } from './common/Xpr';
import { XprTsr } from './common/XprTsr';
import TsrParser from './tsr/TsrParser';

export default async function merge(input: string, output: string): Promise<boolean> {
  const xprResult: Xpr = [];
  const directories = FileManager.directories(input);
  for (const dir of directories) {
    const mergedContent = await FileMerger.merge(path.join(input, dir));
    if (!mergedContent) return false;

    xprResult.push(mergedContent);
  }

  const tsrPath = path.join(input, 'trans.json');
  const tsr = FileManager.readFile(tsrPath);
  if (!tsr) {
    console.log(pc.red('入力フォルダに "trans.json" が存在しません。'));
    return false;
  }

  console.log(`${pc.yellow('パース中')}:`, tsrPath);
  const tsrResult = TsrParser.parse(tsr);
  if (!tsrResult) return false;

  await wait(100);
  eraseUp();
  console.log(`${pc.greenBright('パース完了')}:`, tsrPath);

  const xprTsr = {
    rules: xprResult,
    trans: tsrResult,
  } as XprTsr;

  const dataPath = path.join(output, 'data.json');
  const lastUpdatePath = path.join(output, 'lastUpdate.txt');
  const timestamp = Date.now().toString();

  FileManager.writeFile(dataPath, JSON.stringify(xprTsr));
  FileManager.writeFile(lastUpdatePath, timestamp);
  return true;
}
