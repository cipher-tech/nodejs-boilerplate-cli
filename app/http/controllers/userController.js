/**
 * User controller class
 * contains all methods and properties for interacting  with users
 *
 * @returns {object} userController
 */

import { ResponseHandler } from "../../utils";

class UserController {
    async getUsers(req, res, next) {
        try {
            const { body } = req.body;

            const response = new ResponseHandler(req, res);

            return response.success({
                message: "Registration successful",
                data: ["data"]
            });
        } catch (error) {
            logger.error("Error: Error while fetching user in userController.js", error.code);
            return next(error);
        }
    }
}

export default UserController;
