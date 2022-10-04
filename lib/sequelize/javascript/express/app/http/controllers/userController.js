/**
 * User controller class
 * contains all methods and properties for interacting  with users
 *
 * @returns {object} userController
 */

import UserService from "../../services/userService";
import { ResponseHandler } from "../../utils";

class UserController {
    constructor() {
        this.UserService = new UserService();
    }

    getUsers = async (req, res, next) => {
        try {
            const response = new ResponseHandler(req, res);

            const users = await this.UserService.getUsers();

            return response.success({
                message: "Registration successful",
                data: users
            });
        } catch (error) {
            logger.error("Error: Error while fetching users in userController.js", error);
            return next(error);
        }
    };
}

export default UserController;
