import { XprGroup } from '../common/Xpr';
import XprMetadataBuilder from './XprMetadataBuilder';
import XprNodeBuilder from './XprNodeBuilder';
import XprTokenManager from './XprTokenManager';

/** トークンからツリーを生成するクラス */
export default class XprBuilder {
  /**
   * 与えられたトークンから、トークンツリーを作成します。
   * @param tokens トークンの配列
   * @returns トークンツリー、null: エラーが発生した場合
   */
  public static build(tokens: XprTokenManager): XprGroup | null {
    /** メタデータのツリー */
    const metadata = new XprMetadataBuilder().build(tokens);
    if (!metadata) return null;
    /** ノードのツリー */
    const nodes = new XprNodeBuilder().build(tokens);
    if (!nodes) return null;

    // メタデータとノードを結合
    return Object.assign(metadata, nodes) satisfies XprGroup;
  }
}
