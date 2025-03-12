import { TransKeys } from './TransKeys';

export type Xpr = Array<XprGroup>;
export type XprGroup = XprMetadata & XprNodes;

export type XprMetadata = {
  includes: XprPathList;
  excludes: XprPathList;
  transKeys: TransKeys | {};
};
export type XprNodes = {
  nodes: XprNodeList;
};

export type XprParentNode = {
  xpath: string;
  nodes: XprNodeList;
};
export type XprChildNode = {
  key: string;
  xpath: string;
  multi: boolean;
  attribute: string | null;
  custom: string | null;
};

export type XprPathList = Array<string>;
export type XprNodeList = Array<XprParentNode | XprChildNode>;
