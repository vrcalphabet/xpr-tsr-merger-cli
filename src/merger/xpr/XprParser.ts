import { XprGroup } from '../common/xpr';
import XprBuilder from './XprBuilder';
import XprTokenizer from './XprTokenizer';

export default class XprParser {
  public static parse(filePath: string, xpr: string): XprGroup | null {
    const tokens = XprTokenizer.tokenize(xpr);
    return XprBuilder.build(tokens);
  }
}
