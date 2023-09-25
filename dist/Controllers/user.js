"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.login = exports.signup = void 0;
const user_1 = __importDefault(require("../Models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt = __importStar(require("jsonwebtoken"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userDetails = req.body;
        // console.log(userDetails);
        const userFound = yield user_1.default.findOne({ email: userDetails.email });
        const saltRounds = 10;
        if (userFound) {
            res.status(409).json({ "message": "Email already exist!!!" });
        }
        else {
            bcryptjs_1.default.hash(userDetails.password, saltRounds, (err, hash) => __awaiter(void 0, void 0, void 0, function* () {
                if (err) {
                    res.status(404).json({ "message": "Something went wrong!" });
                }
                else {
                    const user = new user_1.default(Object.assign(Object.assign({}, userDetails), { password: hash }));
                    yield user.save();
                    res.status(200).json(user);
                }
            }));
        }
    }
    catch (err) {
        console.log(err);
        res.status(404).json({ "message": "Something went wrong!" });
    }
});
exports.signup = signup;
function generateToken(id) {
    return jwt.sign({ userID: id }, process.env.SECRET_KEY);
}
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userDetails = (Object.assign({}, req.body));
    try {
        const user = yield user_1.default.findOne({ email: userDetails.email });
        if (user) {
            bcryptjs_1.default.compare(userDetails.password, user.password, (err, result) => {
                if (err)
                    res.status(500).json({ message: "Something went wrong" });
                else if (result === true) {
                    res.status(200).json({ message: 'Login Successful', username: user.name, token: generateToken(user._id) });
                }
                else {
                    res.status(401).json({ message: "Password is incorrect" });
                }
            });
        }
        else {
            res.status(404).json({ message: "User not found :(" });
        }
    }
    catch (err) {
        res.status(404).json({ message: "Something went wrong:(" });
    }
});
exports.login = login;
