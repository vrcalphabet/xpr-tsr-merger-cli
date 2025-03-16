import path from 'path';
import pc from 'picocolors';
import XprParser from '../merger/xpr/XprParser';
import { eraseUp, wait } from '../utils';
import FileManager from '../utils/FileManager';
import KeyComplementer from './KeyComplementer';
import KeysKeyExtractor from './KeysKeyExtractor';
import KeysParser from './KeysParser';
import XprKeyExtractor from './XprKeyExtractor';

export default class FileComplementer {
  private static xprFile = 'rule.xpr';
  private static keysFile = 'keys.json';

  public static async complete(dirPath: string, allKeys: string[]): Promise<boolean> {
    const xprPath = path.join(dirPath, this.xprFile);
    const keysPath = path.join(dirPath, this.keysFile);

    const xpr = FileManager.readFile(xprPath);
    const keys = FileManager.readFile(keysPath);

    if (!xpr) {
      console.log(pc.red(`ディレクトリ ${path.basename(dirPath)} に "rule.xpr" が存在しません。`));
      return false;
    }

    console.log(`${pc.yellow('パース中')}:`, xprPath);
    const xprTree = XprParser.parse(xpr);
    if (!xprTree) return false;
    const xprKeys = XprKeyExtractor.extract(xprTree);

    await wait(100);
    eraseUp();
    console.log(`${pc.greenBright('パース完了')}:`, xprPath);

    console.log(`${pc.yellow('パース中')}:`, keysPath);
    const keysTree = KeysParser.parse(keys);
    if (!keysTree) return false;

    const beforeJSON = JSON.stringify(keysTree);

    const completedKeys = KeyComplementer.complete(keysTree, xprKeys);
    const keysKey = KeysKeyExtractor.extract(completedKeys);
    allKeys.push(...keysKey);

    const afterJSON = JSON.stringify(completedKeys);

    await wait(100);
    eraseUp();
    console.log(
      `${pc.greenBright('パース完了')}:`,
      keysPath,
      beforeJSON !== afterJSON ? '[補完]' : ''
    );

    FileManager.writeFile(keysPath, JSON.stringify(completedKeys, null, 2));
    return true;
  }
}
