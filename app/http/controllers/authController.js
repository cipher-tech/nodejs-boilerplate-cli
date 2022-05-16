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
    constructor() {
        this.response = null;
    }

    /**
     * Method that handles user registration
     * @param {object} req express request object
     * @param {object} res express response object
     *
     * @returns {object} response
     */
    register = async (req, res) => {
        this.response = new Response(req, res);
        return this.response.success({
            message: "this is a message",
            data: []
        });
    };
}

export default AuthController;
