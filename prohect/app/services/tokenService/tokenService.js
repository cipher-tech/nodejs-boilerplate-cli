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
const dayjs_1 = __importDefault(require("dayjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../config"));
/**
* Class that contains methods for managing tokens with JWT.
*/
class TokenService {
    /**
   * Method to generate a singed JWT token
   * @param {object||string} data information to sign with JWT
   * @param {date} timeToLive instance of day.js package object.
   * @returns {text} JWT signed token
   */
    generateToken(data, timeToLive) {
        const payload = {
            data,
            exp: timeToLive.unix()
        };
        return jsonwebtoken_1.default.sign(payload, config_1.default.JWT_SECRET);
    }
    /**
   * Method to sign and return JWT signed object
   * @param {object} user user information to sign with JWT
   * @returns {Promise<Object>} JWT signed token object
   */
    generateAuthToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!user) {
                logger.error("Error: User object required to generate token for TokenService:: generateAuthToken in tokenService.js");
                throw new Error("We've encountered an issue. Please retry in a few minutes.");
            }
            try {
                const timeToLive = (0, dayjs_1.default)().add(config_1.default.JWT_TIME_TO_LIVE, "minutes");
                const data = {
                    id: user.id,
                    email: user.email
                };
                const accessToken = this.generateToken(data, timeToLive);
                return {
                    access: {
                        token: accessToken,
                        expires: timeToLive.toDate()
                    }
                };
            }
            catch (error) {
                logger.error("Error: An error occurred generating token", error);
                throw new Error("We've encountered an issue. Please retry in a few minutes. If the issue persists, please contact support.");
            }
        });
    }
}
exports.default = TokenService;
