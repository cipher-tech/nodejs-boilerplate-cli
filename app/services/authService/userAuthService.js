import {
    StatusCodes
} from "http-status-codes";
import User from "../../../database/models/user";
import ApiError from "../../exceptions/apiError";
import { HashText } from "../../utils";

class UserAuthService {
    registerService = async (body) => {
        try {
            const { password } = body;
            const hashedPassword = await HashText.getHash(password);
            console.log(":::::::::;hashedPassword hashedPassword::::::", hashedPassword);
            return true;
        } catch (error) {
            const { status, message, type, stack } = error;
            logger.error("ERROR: error occurred while attempting to register user in userAuthService.js", error);

            const errorObject = new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, message, error);
            throw errorObject;
        }
    };
}

export default UserAuthService;
