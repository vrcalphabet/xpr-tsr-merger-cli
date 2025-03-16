"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eraseUp = eraseUp;
exports.wait = wait;
function eraseUp() {
    console.log('\u001B[2K\u001B[1A'.repeat(2));
}
function wait(ms = 1000) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
