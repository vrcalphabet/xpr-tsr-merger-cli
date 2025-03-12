import { XprMetadata } from '../common/Xpr';
import xprErrorMessage, { XprErrorMessageGroup } from './xprErrorMessage';
import RegExp from './xprRegExp';
import XprTokenError from './XprTokenError';
import XprTokenManager from './XprTokenManager';

/** トークンからメタデータのみのトークンツリーを作成するクラス */
export default class XprMetadataBuilder {
  /** トークンの配列 */
  private tokens!: XprTokenManager;
  /** 現在のトークン */
  private token: string | null = null;
  /** includesディレクトリパスの配列 */
  private includes: Array<string> = [];
  /** excludesディレクトリパスの配列 */
  private excludes: Array<string> = [];

  /**
   * メタデータを解析します。
   * @param tokens トークンの配列
   * @returns ノードの配列、null: エラーが発生した場合
   */
  public build(tokens: XprTokenManager): XprMetadata | null {
    this.tokens = tokens;

    while (true) {
      this.nextToken();
      // メタデータに何も記述されていない場合、エラー
      if (!this.token) {
        this.error(xprErrorMessage.GENERAL.MISSING_METADATA);
        return null;
      }

      switch (this.token) {
        // メタデータ
        case '@includes':
          this.parseIncludes();
          break;
        case '@excludes':
          this.parseExcludes();
          break;
        // メタデータの終わり
        default:
          // includesの長さが0の場合はエラー
          if (this.includes.length === 0) {
            this.error(xprErrorMessage.GENERAL.MISSING_METADATA);
            return null;
          }

          // ノードトークンを読んでしまっているので、カーソルを前に戻す
          this.prevToken();

          return {
            includes: this.includes,
            excludes: this.excludes,
            keys: {},
          };
      }
    }
  }

  public parseToken(): void {}

  /**
   * `@includes`文を解析します。
   * @returns `directory-path[]` includesディレクトリパスの配列
   */
  private parseIncludes(): void {
    /** ディレクトリパスの配列 */
    const directories = this.parseDirectories(xprErrorMessage.INCLUDES);
    if (!directories) return;

    this.includes = directories;
  }

  /**
   * `@excludes`文を解析します。
   * @returns `directory-path[]` excludesディレクトリパスの配列
   */
  private parseExcludes(): void {
    /** ディレクトリパスの配列 */
    const directories = this.parseDirectories(xprErrorMessage.EXCLUDES);
    if (!directories) return;

    this.excludes = directories;
  }

  /**
   * ディレクトリパスの配列を取得します。
   * @param messageGroup エラーメッセージのブロック
   * @returns `directory-path[]` ディレクトリパスの配列
   */
  private parseDirectories(messageGroup: XprErrorMessageGroup): Array<string> | null {
    this.nextToken();
    // 次のトークンがブロックの始まりでなければエラー
    if (!this.validateToken('{')) {
      this.error(messageGroup.BLOCK_NOT_STARTED);
      return null;
    }

    const directories: Array<string> = [];
    while (true) {
      this.nextToken();
      // 次のトークンがブロックの終わりの場合は終了
      if (this.validateToken('}')) break;

      /** ディレクトリパス */
      const directory = this.parseDirectory(messageGroup);
      if (!directory) return null;
      directories.push(directory);
    }

    return directories;
  }

  /**
   * 次のディレクトリパスを取得します。
   * @param messageGroup エラーメッセージのブロック
   * @returns 1つのディレクトリパス
   */
  private parseDirectory(messageGroup: XprErrorMessageGroup): string | null {
    // 次のトークンがない場合はエラー
    if (!this.token) {
      this.error(messageGroup.MISSING_DIRECTORY);
      return null;
    }
    // 次のトークンが正規表現パターンにマッチしない場合はエラー
    if (!this.validateRegex(RegExp.DIRECTORY_PATH)) {
      this.error(messageGroup.INVALID_FORMAT);
      return null;
    }

    /** ディレクトリパス */
    const directory = this.token;
    this.nextToken();
    // 次のトークンがカンマでない場合はエラー
    if (!this.validateToken(',')) {
      this.error(messageGroup.MISSING_COMMA);
      return null;
    }

    return directory;
  }

  /**
   * 現在のトークンが指定した文字であるかどうかを判定します。
   * @param expectedTokens 期待するトークン
   * @returns true: マッチする場合、false: マッチしない場合
   */
  private validateToken(expectedTokens: string): boolean {
    return this.token === expectedTokens;
  }

  /**
   * 現在のトークンが正規表現パターンにマッチしているかを判定します。
   * @param regex 正規表現パターン
   * @returns true: 正規表現パターンにマッチしている場合、false: マッチしていない場合
   */
  private validateRegex(regex: RegExp): boolean {
    return !!this.token && regex.test(this.token);
  }

  /** 次のトークンをthis.tokenに格納します。 */
  private nextToken(): void {
    this.token = this.tokens.nextToken();
  }

  /** 前のトークンをthis.tokenに格納します。 */
  private prevToken(): void {
    this.token = this.tokens.prevToken();
  }

  /** エラーメッセージを表示します。 */
  private error(message: string): void {
    XprTokenError.show(this.tokens, message);
  }
}
