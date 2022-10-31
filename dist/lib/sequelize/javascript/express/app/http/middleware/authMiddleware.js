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
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const apiError_1 = __importDefault(require("../../exceptions/apiError"));
const userService_1 = __importDefault(require("../../services/userService"));
class AuthMiddleware {
    constructor() {
        this.jwt = jsonwebtoken_1.default;
        this.userService = new userService_1.default();
    }
    userAuth(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.header("Authorization");
                if (!token) {
                    throw new apiError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Unauthorized, please login again.");
                }
                const [, userDetails] = token.split(" ")[1];
                const user = yield this.userService.getUserById(userDetails.id);
                req.user = user;
                next();
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = AuthMiddleware;
