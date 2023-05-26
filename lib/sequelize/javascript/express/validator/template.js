/* eslint-disable class-methods-use-this */
import Joi from "joi";

/**
* A class that holds validation logic .
*/
class Template {
    /**
    * Validator method.
    * Uses Joi package to validate inputs.
    * @param {object} req express request object
    * @param {object} res express response object
    * @param {object} next express middleware next object
    */
    requestValidator(req, res, next) {
        logger.info("Validating incoming request body in ...");
        const { body } = req;
        const schema = Joi.object({
            name: Joi.string().min(3).required(),
            email: Joi.string().email().min(3).required(),
        });
        const { error, value } = schema.validate(body);
        if (error) {
            logger.error("Error occurred while validating incoming request body in ...", error);
            next(error);
        } else {
            logger.info("Finished validating incoming request body in ...");
            req.validatedBody = value;
            next();
        }
    }
}

export default Template;
