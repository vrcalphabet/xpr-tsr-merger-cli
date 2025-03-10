"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    COMMENT: /(?:^|\s)%-\s.*?\s-%(?:\s|$)|(?:^|\s)%\s.*?(?=\n|$)/gs,
    DIRECTORY_PATH: /^\/.*$/,
    XPATH: /^(?:::)?\/.*$/,
    MULTI: /^\*$/,
    ATTRIBUTE: /^\[[a-zA-Z0-9-]+\]$/,
    CUSTOM: /^'[^' ]+'$/,
    KEY: /^[A-Z0-9_]+(?:\.[A-Z0-9_]+)*$/,
};
