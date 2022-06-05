import {
    StatusCodes
} from "http-status-codes";
import ApiError from "../../exceptions/apiError";
import { HashText } from "../../utils";
import TokenService from "../tokenService";
import UserService from "../userService";

class AuthService {
    constructor() {
        this.UserService = new UserService();
    }

    registerService = async (body) => {
        try {
            const {
                password,
                email,
                name,
                phone_number: phoneNumber,
                age,
                date_of_birth: dateOfBirth } = body;

            logger.info("Hashing password. UserAuthService::registerService in userAuthService.js");
            const hashedPassword = await HashText.getHash(password);
            logger.info("Finish hashing password in UserAuthService::registerService in userAuthService.js");

            logger.info(`Checking if user with email: ${email} exists. UserAuthService::registerService in userAuthService.js`);
            const oldUser = await this.UserService.getUserByEmail(email);
            if (oldUser !== null) {
                logger.error(`user with email: ${email} already exists. UserAuthService::registerService in userAuthService.js`);
                throw new ApiError(StatusCodes.CONFLICT, "User with email already exists");
            }
            logger.info(`User with email: ${email} does not exist. UserAuthService::registerService in userAuthService.js`);

            logger.info(`Creating user with email: ${email}. UserAuthService::registerService in userAuthService.js`);
            const newUser = await this.UserService.storeUser({
                name,
                email,
                phone_number: phoneNumber,
                age,
                password: hashedPassword,
                date_of_birth: dateOfBirth
            });
            logger.info(`Successfully created user with email: ${email}. UserAuthService::registerService in userAuthService.js`);

            logger.info(`Generating token for: ${email}. UserAuthService::registerService in userAuthService.js`);
            const tokenService = new TokenService();
            const token = await tokenService.generateAuthToken(newUser);
            logger.info(`Successfully generated token for: ${email}. UserAuthService::registerService in userAuthService.js`);

            return { newUser, token };
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

export default AuthService;
