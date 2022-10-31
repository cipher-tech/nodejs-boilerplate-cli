"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = exports.AuthController = void 0;
const authController_1 = __importDefault(require("./authController"));
const userController_1 = __importDefault(require("./userController"));
exports.AuthController = authController_1.default;
exports.UserController = userController_1.default;
