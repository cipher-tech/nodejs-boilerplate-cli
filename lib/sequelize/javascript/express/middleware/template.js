import { StatusCodes } from "http-status-codes";
import ApiError from "../../exceptions/apiError";

class Template {
    constructor() {
    }

    async userAuth(req, res, next) {
        try {
            const token = req.header("Authorization");
            if (!token) {
                throw new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized, please login again.");
            }

            next();
        } catch (error) {
            next(error);
        }
    }
}

export default Template;
