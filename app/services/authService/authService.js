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

            logger.info(`Hashing password for ${email}. AuthService::registerService in userAuthService.js`);
            const hashedPassword = await HashText.getHash(password);
            logger.info(`Finish hashing password for ${email}. AuthService::registerService in userAuthService.js`);

            logger.info(`Checking if user with email: ${email} exists. AuthService::registerService in userAuthService.js`);
            const oldUser = await this.UserService.getUserByEmail(email);
            if (oldUser !== null) {
                logger.error(`user with email: ${email} already exists. AuthService::registerService in userAuthService.js`);
                throw new ApiError(StatusCodes.CONFLICT, "User with email already exists");
            }
            logger.info(`User with email: ${email} does not exist. AuthService::registerService in userAuthService.js`);

            logger.info(`Creating user with email: ${email}. AuthService::registerService in userAuthService.js`);
            const newUser = await this.UserService.storeUser({
                name,
                email,
                phone_number: phoneNumber,
                age,
                password: hashedPassword,
                date_of_birth: dateOfBirth
            });
            logger.info(`Successfully created user with email: ${email}. AuthService::registerService in userAuthService.js`);

            logger.info(`Generating token for: ${email}. AuthService::registerService in userAuthService.js`);
            const tokenService = new TokenService();
            const token = await tokenService.generateAuthToken(newUser);
            logger.info(`Successfully generated token for: ${email}. AuthService::registerService in userAuthService.js`);

            return { newUser, token };
        } catch (error) {
            console.log("::::::::::::error error", error.code);
            throw error;
        }
    };

    loginService = async (body) => {
        try {
            const { password, email } = body;
            if (!password || !email) {
                throw new Error("Password and email are required");
            }

            const user = await this.UserService.getUserById();
        } catch (error) {
            logger.error("ERROR: error occurred while attempting to login user in userAuthService.js", error);
            throw error
        }
    };
}

export default AuthService;
