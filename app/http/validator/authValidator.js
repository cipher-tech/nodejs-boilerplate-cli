/* eslint-disable class-methods-use-this */
import Joi from "joi";

class AuthValidator {
    registerValidator(req, res, next) {
        logger.info("Validating incoming request body in registerValidator method of AuthValidator class in authValidator.js");
        const { body } = req;
        const schema = Joi.object({
            firstName: Joi.string().min(3).required(),
            lastName: Joi.string().min(3).required(),
            email: Joi.string().min(3).required()
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
}

export default AuthValidator;
