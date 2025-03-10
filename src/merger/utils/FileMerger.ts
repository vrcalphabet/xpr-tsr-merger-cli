import path from 'path';
import FileManager from './FileManager';
import XprParser from '../xpr/XprParser';
import { XprGroup } from '../common/xpr';

export default class FileMerger {
  public static merge(dirPath: string): XprGroup | null {
    const xprPath = path.join(dirPath, 'rule.xpr');
    const keysPath = path.join(dirPath, 'keys.json');

    const xpr = FileManager.readFile(xprPath);
    const keys = FileManager.readFile(keysPath);

    if (!xpr || !keys) {
      console.error(`ディレクトリ ${path.basename(dirPath)} に rule.xpr または keys.json が存在しません。`);
      return null;
    }
    
    const xprTree = XprParser.parse(xprPath, xpr);
    if (!xprTree) return null;
    const keysTree = KeysParser.parse(keysPath, keys);
    if (!keysTree) return null;
    
    return Object.assign(xprTree, { keys: keysTree });
  }
}
