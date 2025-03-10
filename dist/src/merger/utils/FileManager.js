"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class FileManager {
    static directories(dirPath) {
        return fs_1.default.readdirSync(dirPath).filter((file) => {
            return fs_1.default.statSync(path_1.default.join(dirPath, file)).isDirectory();
        });
    }
    static readFile(filePath) {
        try {
            return fs_1.default.readFileSync(filePath, 'utf8');
        }
        catch (error) {
            // ファイルが存在しない場合
            return null;
        }
    }
}
exports.default = FileManager;
