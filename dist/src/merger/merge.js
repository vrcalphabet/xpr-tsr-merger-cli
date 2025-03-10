"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = merge;
const FileManager_1 = __importDefault(require("./utils/FileManager"));
function merge(input, output) {
    const directories = FileManager_1.default.directories(input);
    console.log(directories);
}
