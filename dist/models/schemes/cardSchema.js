"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardSchema = void 0;
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose_1 = __importDefault(require("mongoose"));
exports.cardSchema = new mongoose_1.default.Schema({
    id: {
        type: Number,
        required: true,
    },
    text: {
        type: String,
        required: [true, 'Please enter an item name'],
    },
    description: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
//# sourceMappingURL=cardSchema.js.map