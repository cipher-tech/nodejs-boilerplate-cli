"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable class-methods-use-this */
const joi_1 = __importDefault(require("joi"));
/**
* A class that holds validation logic for authentication.
*/
class AuthValidator {
    /**
    * Validator method.
    * Uses Joi package to validate inputs.
    * @param {object} req express request object
    * @param {object} res express response object
    * @param {object} next express middleware next object
    */
    registerValidator(req, res, next) {
        logger.info("Validating incoming request body in registerValidator method of AuthValidator class in authValidator.js");
        const { body } = req;
        const schema = joi_1.default.object({
            name: joi_1.default.string().min(3).required(),
            email: joi_1.default.string().email().min(3).required(),
            age: joi_1.default.number().integer().max(300).required(),
            password: joi_1.default.string().min(8).required(),
            phone_number: joi_1.default.string().max(11),
            date_of_birth: joi_1.default.date()
        });
        const { error, value } = schema.validate(body);
        if (error) {
            logger.error("Error occurred while validating incoming request body in registerValidator method of AuthValidator class in authValidator.js", error);
            next(error);
        }
        else {
            logger.info("Finished validating incoming request body in registerValidator method of AuthValidator class in authValidator.js");
            req.validatedBody = value;
            next();
        }
    }
    /**
   * Validator method.
   * Uses Joi package to validate inputs.
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next express middleware next object
   */
    loginValidator(req, res, next) {
        logger.info("Validating incoming request body in. AuthValidator::loginValidator in authValidator.js");
        const { body } = req;
        const schema = joi_1.default.object({
            email: joi_1.default.string().email().min(3).required(),
            password: joi_1.default.string().min(8).required()
        });
        const { error, value } = schema.validate(body);
        if (error) {
            logger.error("Error occurred while validating incoming request body. AuthValidator::loginValidator in authValidator.js in authValidator.js", error);
            next(error);
        }
        else {
            logger.info("Finished validating incoming request body. AuthValidator::loginValidator in authValidator.js in authValidator.js");
            req.validatedBody = value;
            next();
        }
    }
}
exports.default = AuthValidator;
