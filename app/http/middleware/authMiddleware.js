import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import ApiError from "../../exceptions/apiError";
import UserService from "../../services/userService";

class AuthMiddleware {
    constructor() {
        this.jwt = jwt;
        this.userService = new UserService();
    }

    async userAuth(req, res, next) {
        try {
            const token = req.header("Authorization");
            if (!token) {
                throw new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized, please login again.");
            }
            const [, userDetails] = token.split(" ")[1];
            const user = await this.userService.getUserById(userDetails.id);

            req.user = user;
            next();
        } catch (error) {
            next(error);
        }
    }
}

export default AuthMiddleware;
