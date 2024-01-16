"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.boardSchema = void 0;
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose_1 = __importDefault(require("mongoose"));
const columnSchema_1 = require("./columnSchema");
exports.boardSchema = new mongoose_1.default.Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: [true, 'Please enter a board name'],
    },
    columnsData: [columnSchema_1.columnSchema],
}, {
    timestamps: true,
});
//# sourceMappingURL=boardSchema.js.map