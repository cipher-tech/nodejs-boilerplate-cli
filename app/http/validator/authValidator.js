/* eslint-disable class-methods-use-this */
import Joi from "joi";

class AuthValidator {
    registerValidator(req, res, next) {
        logger.info("Validating incoming request body in registerValidator method of AuthValidator class in authValidator.js");
        const { body } = req;
        const schema = Joi.object({
            name: Joi.string().min(3).required(),
            email: Joi.string().email().min(3).required(),
            age: Joi.number().integer().max(300).required(),
            password: Joi.string().min(8).required(),
            phone_number: Joi.string().max(11),
            date_of_birth: Joi.date()
        });
        const { error, value } = schema.validate(body);
        if (error) {
            logger.error("Error occurred while validating incoming request body in registerValidator method of AuthValidator class in authValidator.js", error);
            next(error);
        } else {
            logger.info("Finished validating incoming request body in registerValidator method of AuthValidator class in authValidator.js");
            req.validatedBody = value;
            next();
        }
    }

    loginValidator(req, res, next) {
        logger.info("Validating incoming request body in. AuthValidator::loginValidator in authValidator.js");
        const { body } = req;
        const schema = Joi.object({
            email: Joi.string().email().min(3).required(),
            password: Joi.string().min(8).required()
        });
        const { error, value } = schema.validate(body);
        if (error) {
            logger.error("Error occurred while validating incoming request body. AuthValidator::loginValidator in authValidator.js in authValidator.js", error);
            next(error);
        } else {
            logger.info("Finished validating incoming request body. AuthValidator::loginValidator in authValidator.js in authValidator.js");
            req.validatedBody = value;
            next();
        }
    }
}

export default AuthValidator;
