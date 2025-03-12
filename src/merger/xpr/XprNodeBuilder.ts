import { XprChildNode, XprNodes, XprParentNode } from '../common/Xpr';
import xprErrorMessage from './xprErrorMessage';
import RegExp from './xprRegExp';
import XprTokenError from './XprTokenError';
import XprTokenManager from './XprTokenManager';
import { XprTokenType } from './XprTokenType';

/** トークンからノードデータのみのトークンツリーを作成するクラス */
export default class XprNodeBuilder {
  /** トークンの配列 */
  private tokens!: XprTokenManager;
  /** 現在のトークン */
  private token: string | null = null;

  /**
   * ノードを解析します。
   * @param tokens トークンの配列
   * @returns ノードの配列、null: エラーが発生した場合
   */
  public build(tokens: XprTokenManager): XprNodes | null {
    this.tokens = tokens;
    const nodes: XprNodes = { nodes: [] };

    while (true) {
      /** 一つの子ノード、もしくは親ノード */
      const node = this.recursive(false);
      if (!node) return null;
      nodes.nodes.push(node);

      const token = this.peekToken();
      if (!token) break;
    }
    return nodes;
  }

  /**
   * 再帰的にノードを解析します。
   * @param baseMulti マルチセレクタの初期値
   * @returns ノードの配列、null: エラーが発生した場合
   */
  private recursive(baseMulti: boolean): XprParentNode | XprChildNode | null {
    /** キーの一時保存用変数 */
    let key: string = '';
    /** XPathの一時保存用変数 */
    let xpath: string = '';
    /** マルチセレクタの一時保存用変数 */
    let multi: boolean = baseMulti;
    /** 属性名の一時保存用変数 */
    let attribute: string | null = null;
    /** カスタムスタイル */
    let custom: string | null = null;
    /** ノードの一時保存用変数 */
    const nodes: Array<XprParentNode | XprChildNode> = [];

    while (true) {
      this.nextToken();
      // トークンがない場合、エラー
      if (!this.token) {
        this.error(xprErrorMessage.GENERAL.INVALID_TOKEN_END);
        return null;
      }

      /** トークンの種類 */
      const type = this.checkType();
      if (type === null) return null;

      switch (type) {
        // 通常ノード
        case XprTokenType.KEY:
          key = this.token;
          break;
        case XprTokenType.XPATH:
          xpath = this.token;
          break;
        case XprTokenType.MULTI:
          multi = true;
          break;
        case XprTokenType.ATTRIBUTE:
          // 属性は[]で囲まれているので、先頭と末尾の文字を削除
          attribute = this.token.slice(1, -1);
          break;
        case XprTokenType.CUSTOM:
          // カスタムスタイルは''で囲まれているので、先頭と末尾の文字を削除
          custom = ';' + this.token.slice(1, -1);
          break;
        // 特殊記号
        case XprTokenType.BRACKET_OPEN:
          if (key || attribute || custom) {
            this.error(xprErrorMessage.NODE.KEY_ATTRIBUTE_CUSTOM_ERROR);
            return null;
          }

          while (true) {
            // 入れ子を探索
            const node = this.recursive(multi);
            if (!node) return null;
            nodes.push(node);

            // 次のトークンが`}`の場合、XprValueType.BRACKET_CLOSEに移動する
            const token = this.peekToken();
            if (token === '}') break;
          }
          break;
        case XprTokenType.BRACKET_CLOSE:
          if (!xpath) {
            this.error(xprErrorMessage.NODE.MISSING_XPATH);
            return null;
          }
          if (nodes.length === 0) {
            this.error(xprErrorMessage.NODE.MISSING_NODE);
            return null;
          }

          return {
            xpath: xpath,
            nodes: nodes,
          } satisfies XprParentNode;
        case XprTokenType.COMMA:
          if (!xpath) {
            this.error(xprErrorMessage.NODE.MISSING_XPATH);
            return null;
          }
          if (key === '' && custom === null) {
            this.error(xprErrorMessage.NODE.MISSING_KEY);
            return null;
          }

          return {
            key: key,
            xpath: xpath,
            multi: multi,
            attribute: attribute,
            custom: custom,
          } satisfies XprChildNode;
      }
    }
  }

  /**
   * トークンの種類を取得します。
   * @returns トークンの種類、null: 無効なトークンの場合
   */
  private checkType(): XprTokenType | null {
    if (this.validateRegex(RegExp.KEY)) {
      return XprTokenType.KEY;
    }
    if (this.validateRegex(RegExp.XPATH)) {
      return XprTokenType.XPATH;
    }
    if (this.validateRegex(RegExp.MULTI)) {
      return XprTokenType.MULTI;
    }
    if (this.validateRegex(RegExp.ATTRIBUTE)) {
      return XprTokenType.ATTRIBUTE;
    }
    if (this.validateRegex(RegExp.CUSTOM)) {
      return XprTokenType.CUSTOM;
    }
    if (this.validateToken('{')) {
      return XprTokenType.BRACKET_OPEN;
    }
    if (this.validateToken('}')) {
      return XprTokenType.BRACKET_CLOSE;
    }
    if (this.validateToken(',')) {
      return XprTokenType.COMMA;
    }

    this.error(xprErrorMessage.GENERAL.INVALID_TOKEN);
    return null;
  }

  /**
   * 現在のトークンが指定した文字であるかどうかを判定します。
   * @param expectedTokens 期待するトークン、複数ある場合はいずれかにマッチすればtrue
   * @returns true: マッチする場合、false: マッチしない場合
   */
  private validateToken(...expectedTokens: Array<string>): boolean {
    return !!this.token && expectedTokens.includes(this.token);
  }

  /**
   * 現在のトークンが正規表現パターンにマッチしているかを判定します。
   * @param regex 正規表現パターン
   * @returns true: 正規表現パターンにマッチしている場合、false: マッチしていない場合
   */
  private validateRegex(regex: RegExp): boolean {
    return !!this.token && regex.test(this.token);
  }

  /** 次のトークンを取得します。ポインタが移動することはありません。 */
  private peekToken(): string | null {
    return this.tokens.peekToken();
  }

  /** 次のトークンをthis.tokenに格納します。 */
  private nextToken(): void {
    this.token = this.tokens.nextToken();
  }

  /** エラーメッセージを表示します。 */
  private error(message: string): void {
    XprTokenError.show(this.tokens, message);
  }
}
