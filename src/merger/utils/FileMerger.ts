import path from 'path';
import pc from 'picocolors';
import { XprGroup } from '../common/Xpr';
import KeysParser from '../keys/KeysParser';
import XprParser from '../xpr/XprParser';
import FileManager from './FileManager';

export default class FileMerger {
  private static xprFile = 'rule.xpr';
  private static keysFile = 'keys.json';

  public static merge(dirPath: string): XprGroup | null {
    const xprPath = path.join(dirPath, this.xprFile);
    const keysPath = path.join(dirPath, this.keysFile);

    const xpr = FileManager.readFile(xprPath);
    const keys = FileManager.readFile(keysPath);

    if (!xpr || !keys) {
      console.log(
        pc.red(
          `ディレクトリ ${path.basename(dirPath)} に "rule.xpr" または "keys.json" が存在しません。`
        )
      );
      return null;
    }

    console.log(`${pc.yellow('パース中')}:`, xprPath);
    const xprTree = XprParser.parse(xpr);
    if (!xprTree) return null;

    console.log(`${pc.yellow('パース中')}:`, keysPath);
    const keysTree = KeysParser.parse(keys);
    if (!keysTree) return null;

    return Object.assign(xprTree, { keys: keysTree });
  }
}
