import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import config from "../../../config";

/**
* Class that contains methods for managing tokens with JWT.
*/
class TokenService {
    /**
   * Method to generate a singed JWT token
   * @param {object||string} data information to sign with JWT
   * @param {date} timeToLive instance of day.js package object.
   * @returns {text} JWT signed token
   */
    generateToken(data, timeToLive) {
        const payload = {
            data,
            exp: timeToLive.unix()
        };
        return jwt.sign(payload, config.JWT_SECRET);
    }

    /**
   * Method to sign and return JWT signed object
   * @param {object} user user information to sign with JWT
   * @returns {Promise<Object>} JWT signed token object
   */
    async generateAuthToken(user) {
        if (!user) {
            logger.error("Error: User object required to generate token for TokenService:: generateAuthToken in tokenService.js");
            throw new Error("We've encountered an issue. Please retry in a few minutes.");
        }
        try {
            const timeToLive = dayjs().add(config.JWT_TIME_TO_LIVE, "minutes");
            const data = {
                id: user.id,
                email: user.email
            };
            const accessToken = this.generateToken(data, timeToLive);
            return {
                access: {
                    token: accessToken,
                    expires: timeToLive.toDate()
                }
            };
        } catch (error) {
            logger.error("Error: An error occurred generating token", error);
            throw new Error("We've encountered an issue. Please retry in a few minutes. If the issue persists, please contact support.");
        }
    }
}

export default TokenService;
