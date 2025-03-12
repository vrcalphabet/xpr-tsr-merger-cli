import { XprGroup } from '../common/Xpr';
import XprBuilder from './XprBuilder';
import XprTokenizer from './XprTokenizer';

export default class XprParser {
  public static parse(xpr: string): XprGroup | null {
    const tokens = XprTokenizer.tokenize(xpr);
    return XprBuilder.build(tokens);
  }
}
