"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = merge;
const path_1 = __importDefault(require("path"));
const FileManager_1 = __importDefault(require("./utils/FileManager"));
const FileMerger_1 = __importDefault(require("./utils/FileMerger"));
function merge(input, output) {
    const directories = FileManager_1.default.directories(input);
    directories.forEach((dir) => {
        if (dir === 'emailtwofactorauth') {
            FileMerger_1.default.merge(path_1.default.join(input, dir));
        }
    });
}
