import bcrypt from "bcrypt";
import config from "../../config";

class HashText {
    static async getHash(text) {
        try {
            logger.info("INFO: Attempting to hash text in hashText.js");
            const salt = Number(config.SALT_ROUNDS);
            const hashedTest = await bcrypt.hash(text, salt);

            logger.info("INFO: Text successfully hashed in hashText.js");
            return hashedTest;
        } catch (error) {
            logger.error("ERROR: error occurred while hashing text in hashText.js", error);
            throw new Error("An error occurred please try again or contact support.");
        }
    }

    /**
    * Verify token and return token doc (or throw an error if it is not valid)
    * @param {string} text
    * @returns {Promise<boolean>}
    */
    static async verifyHash(text, hashedText) {
        try {
            logger.info("INFO: Attempting to verify text in hashText.js");
            const hashedTest = await bcrypt.compare(text, hashedText);

            logger.info("INFO: Text successfully verified in hashText.js");
            return hashedTest;
        } catch (error) {
            logger.error("ERROR: error occurred while verifying text in hashText.js", error);
            throw new Error("Could not hash test.");
        }
    }
}

export default HashText;
