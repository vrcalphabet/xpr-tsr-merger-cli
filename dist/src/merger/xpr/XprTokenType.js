"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XprTokenType = void 0;
var XprTokenType;
(function (XprTokenType) {
    XprTokenType[XprTokenType["KEY"] = 0] = "KEY";
    XprTokenType[XprTokenType["XPATH"] = 1] = "XPATH";
    XprTokenType[XprTokenType["MULTI"] = 2] = "MULTI";
    XprTokenType[XprTokenType["ATTRIBUTE"] = 3] = "ATTRIBUTE";
    XprTokenType[XprTokenType["CUSTOM"] = 4] = "CUSTOM";
    XprTokenType[XprTokenType["BRACKET_OPEN"] = 5] = "BRACKET_OPEN";
    XprTokenType[XprTokenType["BRACKET_CLOSE"] = 6] = "BRACKET_CLOSE";
    XprTokenType[XprTokenType["COMMA"] = 7] = "COMMA";
})(XprTokenType || (exports.XprTokenType = XprTokenType = {}));
