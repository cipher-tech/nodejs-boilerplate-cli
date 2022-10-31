"use strict";
/**
 * User controller class
 * contains all methods and properties for interacting  with users
 *
 * @returns {object} userController
 */
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
const userService_1 = __importDefault(require("../../services/userService"));
const utils_1 = require("../../utils");
class UserController {
    constructor() {
        this.getUsers = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = new utils_1.ResponseHandler(req, res);
                const users = yield this.UserService.getUsers();
                return response.success({
                    message: "Registration successful",
                    data: users
                });
            }
            catch (error) {
                logger.error("Error: Error while fetching users in userController.js", error);
                return next(error);
            }
        });
        this.UserService = new userService_1.default();
    }
}
exports.default = UserController;
