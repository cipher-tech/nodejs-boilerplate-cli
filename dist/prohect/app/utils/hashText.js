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
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
/**
* Utility class the with methods to manage text hashing.
*/
class HashText {
    /**
    * Static method that generates and returns a hashed text
    * @param {string} text text to hashed.
    * @returns {Promise<text>} hashed text
    */
    static getHash(text) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger.info("INFO: Attempting to hash text in hashText.js");
                const salt = Number(config_1.default.SALT_ROUNDS);
                const hashedTest = yield bcrypt_1.default.hash(text, salt);
                logger.info("INFO: Text successfully hashed in hashText.js");
                return hashedTest;
            }
            catch (error) {
                logger.error("ERROR: error occurred while hashing text in hashText.js", error);
                throw new Error("An error occurred please try again or contact support.");
            }
        });
    }
    /**
    * Verify token and return token doc (or throw an error if it is not valid)
    * @param {string} text text to compare with hash
    * @param {string} hashedText hashed text
    * @returns {Promise<boolean>}
    */
    static verifyHash(text, hashedText) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger.info("INFO: Attempting to verify text in hashText.js");
                const isTextAMatch = yield bcrypt_1.default.compare(text, hashedText);
                logger.info("INFO: Text successfully verified in hashText.js");
                return isTextAMatch;
            }
            catch (error) {
                logger.error("ERROR: error occurred while verifying text in hashText.js", error);
                throw new Error("Could not hash test.");
            }
        });
    }
}
exports.default = HashText;
