"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodo = exports.deleteTodo = exports.getTodos = exports.addTodo = void 0;
const todo_1 = __importDefault(require("../Models/todo"));
// import User from '../Models/user';
const addTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todoInfo = Object.assign({}, req.body);
    try {
        console.log(req.user._id);
        const newTodo = new todo_1.default(Object.assign(Object.assign({}, todoInfo), { userId: req.user._id }));
        console.log(newTodo);
        yield newTodo.save();
        res.status(200).json(newTodo);
    }
    catch (err) {
        console.log(err);
    }
});
exports.addTodo = addTodo;
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(req.user._id);
        const todos = yield todo_1.default.find({ userId: req.user._id }).select('-userId');
        // console.log(todos);
        res.status(201).json(todos);
    }
    catch (err) {
        console.log(err);
    }
});
exports.getTodos = getTodos;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todoId = req.query.id;
    console.log(todoId);
    try {
        yield todo_1.default.findOneAndDelete({ _id: todoId });
        res.status(201).json({ "message": "todo deleted" });
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteTodo = deleteTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todoId = req.query.id;
    try {
        yield todo_1.default.findOneAndUpdate({ _id: todoId }, { completed: true });
        console.log('updated');
        res.status(201).json({ message: "todo marked as completed" });
    }
    catch (err) {
        console.log(err);
    }
});
exports.updateTodo = updateTodo;
