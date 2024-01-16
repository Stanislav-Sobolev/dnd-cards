"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose_1 = __importDefault(require("mongoose"));
const boardSchema_1 = require("./schemes/boardSchema");
exports.Board = mongoose_1.default.model('Board', boardSchema_1.boardSchema);
//# sourceMappingURL=boardModel.js.map