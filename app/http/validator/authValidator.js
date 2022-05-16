/* eslint-disable class-methods-use-this */
import Joi from "joi";

class AuthValidator {
    registerValidator(req, res, next) {
        const { body } = req;
        const schema = Joi.object({
            firstName: Joi.string().min(3).required(),
            lastName: Joi.string().min(3).required(),
            email: Joi.string().min(3).required()
        });

        const { error, value } = schema.validate(body);
        if (error) {
            next(error);
        } else {
            req.validatedBody = value;
            next();
        }
    }
}

export default AuthValidator;
