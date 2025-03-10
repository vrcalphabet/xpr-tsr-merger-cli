import XprTokenManager from './XprTokenManager';

export default class XprTokenError {
  public static show(tokens: XprTokenManager, message: string): void {
    const slicedTokens = this.sliceTokens(tokens.getTokens(), tokens.getIndex(), 5);
    console.error(`XPR解析エラー: ${message}`);
    console.error(`${slicedTokens.join(' ')}`);
  }

  private static sliceTokens(tokens: string[], index: number, offset: number): string[] {
    const left = Math.max(0, index - offset);
    const right = Math.min(tokens.length, index + offset);
    return tokens.slice(left, right);
  }
}
