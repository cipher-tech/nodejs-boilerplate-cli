import { ResponseHandler } from "../../utils";

/**
 * AuthController class
 *
 * NOTE: Use fat arrow syntax(() => {}) if you wish to use the 'this' keyword
 * using the normal function syntax (foo(){}) will cause the 'this' keyword to be undefined
 *
 * fat arrow syntax(() => {}) automatically binds the 'this' keyword.
 *
 * @returns {object} AuthController
 */

class AuthController {
    /**
     * Method that handles user registration
     * @param {object} req express request object
     * @param {object} res express response object
     * @param {function} next express response object
     *
     * @returns {object} response
     */
    create = async (req, res, next) => {
        try {
            const { body } = req;
            // instantiates the response class to return formatted and consistent data
            const response = new ResponseHandler(req, res);
    
            return response.success({
                message: "Registration successful",
                data: loginService
            });
        } catch (error) {
            logger.error("Error: Error while registering user in authController.js", error.code);
            next(error);
        }
    };
}

export default AuthController;
