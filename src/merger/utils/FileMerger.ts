import path from 'path';
import FileManager from './FileManager';
import XprParser from '../xpr/XprParser';

export default class FileMerger {
  public static merge(dirPath: string): void | null {
    const xprPath = path.join(dirPath, 'rule.xpr');
    const keysPath = path.join(dirPath, 'keys.json');

    const xpr = FileManager.readFile(xprPath);
    const keys = FileManager.readFile(keysPath);

    if (!xpr || !keys) {
      console.error(`ディレクトリ ${path.basename(dirPath)} に rule.xpr または keys.json が存在しません。`);
      return null;
    }
    
    console.log(XprParser.parse(xprPath, xpr));
  }
}
