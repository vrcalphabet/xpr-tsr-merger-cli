import pc from 'picocolors';
import XprTokenManager from './XprTokenManager';

export default class XprTokenError {
  public static show(tokens: XprTokenManager, message: string): void {
    const slicedTokens = this.sliceTokens(tokens.getTokens(), tokens.getIndex(), 5);
    console.log(pc.red(`XPR解析エラー: ${message}`));
    console.log(pc.red(slicedTokens.join(' ')));
  }

  private static sliceTokens(tokens: string[], index: number, offset: number): string[] {
    tokens[index] = `>>> ${tokens[index]} <<<`;
    const left = Math.max(0, index - offset);
    const right = Math.min(tokens.length, index + offset);
    return tokens.slice(left, right);
  }
}
