"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const user_1 = __importDefault(require("./user"));
const mongodb_1 = require("mongodb");
const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    userId: {
        type: mongodb_1.ObjectId,
        ref: user_1.default
    },
    completed: {
        type: Boolean,
        default: false
    }
});
exports.default = mongoose_1.default.model('Todo', todoSchema);
