import { XprChildNode, XprGroup, XprNodeList, XprParentNode } from '../merger/common/Xpr';

export default class XprKeyExtractor {
  private static keys: string[];
  
  public static extract(xpr: XprGroup): string[] {
    this.keys = [];
    this.extractKeys(xpr);
    return this.keys;
  }
  
  private static extractKeys(xpr: XprGroup): void {
    this.recursiveNodes(xpr.nodes);
  }
  
  private static recursiveNodes(nodes: XprNodeList): void {
    for (const node of nodes) {
      this.recursiveNode(node);
    }
  }
  
  private static recursiveNode(node: XprParentNode | XprChildNode): void {
    if ('key' in node) {
      this.keys.push(node.key);
    } else {
      this.recursiveNodes(node.nodes);
    }
  }
}