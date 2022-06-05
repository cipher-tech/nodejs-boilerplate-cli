import {
    StatusCodes
} from "http-status-codes";
import database from "../../../database";
import User from "../../../database/models/user";
import ApiError from "../../exceptions/apiError";
import { HashText } from "../../utils";

class UserAuthService {
    registerService = async (body) => {
        try {
            console.log(":::::::::;dbdbdbdbdbdb::::::::::::", database.User);
            const {
                password,
                email,
                name,
                phone_number: phoneNumber,
                age,
                date_of_birth: dateOfBirth } = body;
            logger.info("Hashing password. UserAuthService::registerService in userAuthService.js");
            const hashedPassword = await HashText.getHash(password);
            logger.info("Finish hashing password in UserAuthService::registerService. userAuthService.js");

            logger.info(`Checking if user with email: ${email} exists. UserAuthService::registerService in userAuthService.js`);
            const oldUser = await database.User.findOne({ where: { email } });
            console.log("::::::::;oldUser::::::::", oldUser);

            if (oldUser !== null) {
                logger.error(`user with email: ${email} already exists. UserAuthService::registerService in userAuthService.js`);
                throw new ApiError(StatusCodes.CONFLICT, "User with email already exists");
            }
            logger.info(`User with email: ${email} does not exist. UserAuthService::registerService in userAuthService.js`);

            logger.info(`Creating user with email: ${email}. UserAuthService::registerService in userAuthService.js`);
            const dbUser = database.User;
            const newUser = await dbUser.create({
                name,
                email,
                phone_number: phoneNumber,
                age,
                password: hashedPassword,
                date_of_birth: dateOfBirth
            });
            logger.info(`Successfully created user with email: ${email}. UserAuthService::registerService in userAuthService.js`);

            console.log("::::::::;newUser::::::::", newUser);
            return newUser;
        } catch (error) {
            const { message, status, type, stack } = error;
            logger.error("ERROR: error occurred while attempting to register user in userAuthService.js", error);
            const errorObject = new ApiError({
                status,
                message,
                type,
                stack
            });
            throw errorObject;
        }
    };
}

export default UserAuthService;
