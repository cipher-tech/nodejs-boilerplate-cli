import bcrypt from "bcrypt";
import config from "../../config";

class HashText {
    static async getHash(text) {
        try {
            logger.info("INFO: Attempting to hash text in hashText.js");
            const salt = Number(config.SALT_ROUNDS);
            console.log(salt);
            const hashedTest = await bcrypt.hash(text, salt);

            logger.info("INFO: Text successfully hashed in hashText.js");
            return hashedTest;
        } catch (error) {
            logger.error("ERROR: error occurred while hashing text in hashText.js", error);
            throw new Error("An error occurred please try again or contact support.");
        }
    }
}

export default HashText;
