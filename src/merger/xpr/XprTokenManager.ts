/** トークンを格納し、順次アクセスを可能にするクラス */
export default class XprTokenManager {
  private tokens: Array<string>;
  private index;

  public constructor() {
    this.tokens = [];
    this.index = -1;
  }

  /**
   * トークンを格納します。
   * @param token 格納するトークン
   */
  public add(...token: string[]): void {
    this.tokens.push(...token);
  }

  /**
   * ポインタを移動せずに次のトークンを取得します。
   * @returns 次のトークンで、無い場合はnull
   */
  public peekToken(): string | null {
    // 配列の範囲外にポインタが当たっている場合
    if (this.index <= 0 || this.index >= this.tokens.length - 1) {
      return null;
    }
    return this.tokens[this.index + 1];
  }

  /**
   * 次のトークンを取得します。
   * @returns 次のトークンで、無い場合はnull
   */
  public nextToken(): string | null {
    // 配列の範囲外にポインタが当たっている場合
    if (this.index >= this.tokens.length - 1) {
      return null;
    }
    return this.tokens[++this.index];
  }

  /**
   * 前のトークンを取得します。
   * @return 前のトークンで、無い場合はnull
   */
  public prevToken(): string | null {
    // 配列の範囲外にポインタが当たっている場合
    if (this.index <= 0) {
      return null;
    }
    return this.tokens[--this.index];
  }

  public getTokens(): Array<string> {
    return this.tokens;
  }

  public getIndex(): number {
    return this.index;
  }
}
