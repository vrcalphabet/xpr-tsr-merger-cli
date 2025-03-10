"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const XprMetadataBuilder_1 = __importDefault(require("./XprMetadataBuilder"));
const XprNodeBuilder_1 = __importDefault(require("./XprNodeBuilder"));
/** トークンからツリーを生成するクラス */
class XprBuilder {
    /**
     * 与えられたトークンから、トークンツリーを作成します。
     * @param tokens トークンの配列
     * @returns トークンツリー、null: エラーが発生した場合
     */
    static build(tokens) {
        /** メタデータのツリー */
        const metadata = new XprMetadataBuilder_1.default().build(tokens);
        if (metadata === null)
            return null;
        /** ノードのツリー */
        const nodes = new XprNodeBuilder_1.default().build(tokens);
        if (nodes === null)
            return null;
        // メタデータとノードを結合
        return Object.assign(metadata, nodes);
    }
}
exports.default = XprBuilder;
