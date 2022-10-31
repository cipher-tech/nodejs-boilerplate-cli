"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authService_1 = __importDefault(require("../../services/authService"));
const utils_1 = require("../../utils");
/**
 * User AuthController class
 * contains all methods and properties for Authenticating users.
 *
 * NOTE: Use fat arrow syntax(() => {}) if you wish to use the 'this' keyword
 * using the normal function syntax (foo(){}) will cause the 'this' keyword to be undefined
 *
 * fat arrow syntax(() => {}) automatically binds the 'this' keyword.
 *
 * @returns {object} AuthController
 */
class AuthController {
    constructor() {
        /**
         * Method that handles user registration
         * @param {object} req express request object
         * @param {object} res express response object
         * @param {function} next express response object
         *
         * @returns {object} response
         */
        this.register = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            // instantiates the response class to return formatted and consistent data
            const response = new utils_1.ResponseHandler(req, res);
            try {
                const userAuthService = new authService_1.default();
                const registerService = yield userAuthService.registerService(body);
                if (registerService) {
                    response.success({
                        message: "Registration successful",
                        data: registerService
                    });
                }
                else {
                    throw new Error("An error occurred, we're looking into it.");
                }
            }
            catch (error) {
                logger.error("Error: Error while registering user in authController.js", error.code);
                next(error);
            }
        });
        /**
        * Method that handles user login
        * @param {object} req express request object
        * @param {object} res express response object
        * @param {function} next express response object
        *
        * @returns {object} response
        */
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            const response = new utils_1.ResponseHandler(req, res);
            try {
                logger.info("attempting to login user. :::AuthController::login in authController.js");
                const userAuthService = new authService_1.default();
                const loginService = yield userAuthService.loginService(body);
                if (loginService) {
                    response.success({
                        message: "Registration successful",
                        data: loginService
                    });
                }
                else {
                    throw new Error("An error occurred, we're looking into it.");
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = AuthController;
