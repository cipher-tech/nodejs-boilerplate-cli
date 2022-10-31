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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const apiError_1 = __importDefault(require("../../exceptions/apiError"));
const utils_1 = require("../../utils");
const tokenService_1 = __importDefault(require("../tokenService"));
const userService_1 = __importDefault(require("../userService"));
/**
* Authentication service class
* holds methods with logic to authenticate a user
* @param {object} req express request object
* @param {object} res express response object
* @param {function} next express response object
*
* @returns {object} response
*/
class AuthService {
    constructor() {
        /**
        * Method with logic to register a user
        * @param {object} body express request body
        * @returns {Promise<object>} {user, token}
        */
        this.registerService = (body) => __awaiter(this, void 0, void 0, function* () {
            const { password, email, name, phone_number: phoneNumber, age, date_of_birth: dateOfBirth } = body;
            logger.info(`Hashing password for ${email}. AuthService::registerService in userAuthService.js`);
            const hashedPassword = yield utils_1.HashText.getHash(password);
            logger.info(`Finish hashing password for ${email}. AuthService::registerService in userAuthService.js`);
            logger.info(`Checking if user with email: ${email} exists. AuthService::registerService in userAuthService.js`);
            const oldUser = yield this.UserService.getUserByEmail(email);
            if (oldUser != null) {
                logger.error(`user with email: ${email} already exists. AuthService::registerService in userAuthService.js`);
                throw new apiError_1.default(http_status_codes_1.StatusCodes.CONFLICT, "User with email already exists");
            }
            logger.info(`User with email: ${email} does not exist. AuthService::registerService in userAuthService.js`);
            logger.info(`Creating user with email: ${email}. AuthService::registerService in userAuthService.js`);
            const newUser = yield this.UserService.storeUser({
                name,
                email: email.toLowerCase(),
                phone_number: phoneNumber,
                age,
                password: hashedPassword,
                date_of_birth: dateOfBirth
            });
            logger.info(`Successfully created user with email: ${email}. AuthService::registerService in userAuthService.js`);
            logger.info(`Generating token for: ${email}. AuthService::registerService in userAuthService.js`);
            const tokenService = new tokenService_1.default();
            const token = yield tokenService.generateAuthToken(newUser);
            logger.info(`Successfully generated token for: ${email}. AuthService::registerService in userAuthService.js`);
            // Exclude password from user object returned dy sequelize
            const _a = newUser.dataValues, { password: userPassword } = _a, userDetails = __rest(_a, ["password"]);
            return { userDetails, token };
        });
        /**
        * Method with logic to log a user in
        * @param {object} body express request body
        * @returns {Promise<object>} {user, token}
        */
        this.loginService = (body) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { password, email } = body;
                if (!password || !email) {
                    throw new apiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Password and email are required");
                }
                logger.info(`Checking if user with email: ${email} exists. AuthService::loginService in userAuthService.js`);
                const user = yield this.UserService.getUserByEmail(email.toLowerCase());
                if (!user) {
                    logger.info(`User with email: ${email} does not exists. AuthService::loginService in userAuthService.js`);
                    throw new apiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid email or password please try again");
                }
                logger.info(`Checking if password matches user with email: ${email}. AuthService::loginService in userAuthService.js`);
                const doesPasswordMatch = yield utils_1.HashText.verifyHash(password, user.password);
                if (!doesPasswordMatch) {
                    logger.info(`Password does not match for user with email: ${email}. AuthService::loginService in userAuthService.js`);
                    throw new apiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid email or password please try again");
                }
                logger.info(`Password matches user with email: ${email}. AuthService::loginService in userAuthService.js`);
                logger.info(`Generating token for: ${email}. AuthService::loginService in userAuthService.js`);
                const tokenService = new tokenService_1.default();
                const token = yield tokenService.generateAuthToken(user);
                logger.info(`Successfully generated token for: ${email}. AuthService::loginService in userAuthService.js`);
                // Exclude password from user object returned dy sequelize
                const _b = user.dataValues, { password: userPassword } = _b, userDetails = __rest(_b, ["password"]);
                return { userDetails, token };
            }
            catch (error) {
                logger.error("ERROR: error occurred while attempting to login user in userAuthService.js", error);
                throw error;
            }
        });
        this.UserService = new userService_1.default();
    }
}
exports.default = AuthService;
