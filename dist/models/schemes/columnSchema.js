"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.columnSchema = void 0;
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose_1 = __importDefault(require("mongoose"));
const cardSchema_1 = require("./cardSchema");
exports.columnSchema = new mongoose_1.default.Schema({
    id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: [true, 'Please enter a column title'],
    },
    items: [cardSchema_1.cardSchema],
}, {
    timestamps: true,
});
//# sourceMappingURL=columnSchema.js.map