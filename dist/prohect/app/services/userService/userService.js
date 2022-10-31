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
const database_1 = __importDefault(require("../../../database"));
/**
* Class contains methods for interacting with the user model.
*/
class UserService {
    constructor() {
        this.User = database_1.default.User;
    }
    /**
    * Method to retrieve user by email from the database.
    * @param {text} email email to search for in the database
    * @returns {Promise<boolean>} user model
    */
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.User.findAll({
                    attributes: { exclude: ["password", "updated_at"] }
                });
                return users;
            }
            catch (error) {
                logger.error("ERROR: An error occurred while retrieving users in userService.js", error);
                throw new Error("An error occurred. we're looking into it.");
            }
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const emailToLowerCase = email.toLowerCase();
                const user = yield this.User.findOne({
                    where: { email: emailToLowerCase }
                });
                return user;
            }
            catch (error) {
                logger.error("ERROR: An error occurred while retrieving user in userService.js", error);
                throw new Error("An error occurred. we're looking into it.");
            }
        });
    }
    /**
   * Method to retrieve user by id from the database.
   * @param {text} id id to search for in the database
   * @returns {Promise<boolean>} user model
   */
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                logger.error("ERROR: User id cannot be empty in getUserById method of userService.js");
                throw new Error("An error occurred. we're looking into it.");
            }
            try {
                const user = yield this.User.findByPk(id);
                return user;
            }
            catch (error) {
                logger.error("ERROR: An error occurred while retrieving user in userService.js", error);
                throw new Error("An error occurred. we're looking into it.");
            }
        });
    }
    /**
   * Method to store user in the database.
   * @param {object} userDetails  user details to store in the database
   * @returns {Promise<boolean>} user model
   */
    storeUser(userDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userDetails) {
                logger.error("ERROR: User info cannot be empty in storeUser method of userService.js");
                throw new Error("An error occurred. we're looking into it.");
            }
            try {
                const newUser = yield this.User.create(Object.assign({}, userDetails));
                return newUser;
            }
            catch (error) {
                logger.error("ERROR: An error occurred while storing user in userService.js", error);
                throw new Error("An error occurred. we're looking into it.");
            }
        });
    }
}
exports.default = UserService;
