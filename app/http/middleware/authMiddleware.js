import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import UserService from "../../services/userService";
import { ResponseHandler } from "../../utils";

class AuthMiddleware {
    constructor() {
        this.jwt = jwt;
        this.userService = new UserService();
    }

    async userAuth(req, res, next) {
        try {
            const response = new ResponseHandler(req, res);
            const token = req.header("Authorization");
            if (!token) {
                response.error(StatusCodes.UNAUTHORIZED, "Unauthorized, please login again.");
            }
            const [, userDetails] = token.split(" ")[1];
            console.log(":::::::::userDetailsuserDetails::::::", userDetails);
            const user = await this.userService.getUserById(userDetails.id);
            console.log(":::::::::userDetailsuserDetails::::::", user);

            req.user = user;
            next();
        } catch (error) {
            next(error);
        }
    }
}

export default AuthMiddleware;
