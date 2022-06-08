import { UserAuthenticationService } from "../../services/authService";
import Response from "../../utils/responseHandler";

/**
 * User AuthController class
 * contains all methods and properties for Authenticating users.
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
    register = async (req, res, next) => {
        const { body } = req;
        const response = new Response(req, res);

        try {
            const userAuthService = new UserAuthenticationService();
            const registerService = await userAuthService.registerService(body);
            if (registerService) {
                response.success({
                    message: "Registration successful",
                    data: registerService
                });
            } else {
                throw new Error("An error occurred, we're looking into it.");
            }
        } catch (error) {
            logger.error("Error: Error while registering user in authController.js", error.code);
            next(error);
        }
    };

    login = async (req, res, next) => {
        const { body } = req;
        const response = new Response(req, res);
        try {
            fdf
            logger.info("attempting to log user. :::AuthController::login in authController.js");
        } catch (error) {
            next(error);
        }
    }
}

export default AuthController;
