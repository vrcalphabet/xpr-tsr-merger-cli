"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = complete;
const path_1 = __importDefault(require("path"));
const FileManager_1 = __importDefault(require("../utils/FileManager"));
const FileComplementer_1 = __importDefault(require("./FileComplementer"));
async function complete(input) {
    const directories = FileManager_1.default.directories(input);
    for (const dir of directories) {
        const success = await FileComplementer_1.default.complete(path_1.default.join(input, dir));
        if (!success)
            return;
    }
}
