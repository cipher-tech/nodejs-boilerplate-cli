import {
    StatusCodes
} from "http-status-codes";
import ApiError from "../../exceptions/apiError";
import { HashText } from "../../utils";
import TokenService from "../tokenService";
import UserService from "../userService";

/**
* Authentication service class
* holds methods with logic to authenticate a user
* @param {object} req express request object
* @param {object} res express response object
* @param {function} next express response object
*
* @returns {object} response
*/
class AuthService {
    constructor() {
        this.UserService = new UserService();
    }

    /**
    * Method with logic to register a user
    * @param {object} body express request body
    * @returns {Promise<object>} {user, token}
    */
    registerService = async (body) => {
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
            email: email.toLowerCase(),
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

        // Exclude password from user object returned dy sequelize
        const { password: userPassword, ...userDetails } = newUser.dataValues;
        return { userDetails, token };
    };

    /**
    * Method with logic to log a user in
    * @param {object} body express request body
    * @returns {Promise<object>} {user, token}
    */
    loginService = async (body) => {
        try {
            const { password, email } = body;
            if (!password || !email) {
                throw new ApiError(StatusCodes.BAD_REQUEST, "Password and email are required");
            }

            logger.info(`Checking if user with email: ${email} exists. AuthService::loginService in userAuthService.js`);

            const user = await this.UserService.getUserByEmail(email.toLowerCase());
            if (!user) {
                logger.info(`User with email: ${email} does not exists. AuthService::loginService in userAuthService.js`);
                throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid email or password please try again");
            }

            logger.info(`Checking if password matches user with email: ${email}. AuthService::loginService in userAuthService.js`);
            const doesPasswordMatch = await HashText.verifyHash(password, user.password);

            if (!doesPasswordMatch) {
                logger.info(`Password does not match for user with email: ${email}. AuthService::loginService in userAuthService.js`);
                throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid email or password please try again");
            }
            logger.info(`Password matches user with email: ${email}. AuthService::loginService in userAuthService.js`);

            logger.info(`Generating token for: ${email}. AuthService::loginService in userAuthService.js`);
            const tokenService = new TokenService();
            const token = await tokenService.generateAuthToken(user);
            logger.info(`Successfully generated token for: ${email}. AuthService::loginService in userAuthService.js`);

            // Exclude password from user object returned dy sequelize
            const { password: userPassword, ...userDetails } = user.dataValues;
            return { userDetails, token };
        } catch (error) {
            logger.error("ERROR: error occurred while attempting to login user in userAuthService.js", error);
            throw error;
        }
    };
}

export default AuthService;
