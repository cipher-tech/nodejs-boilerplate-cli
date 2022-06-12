import database from "../../../database";

/**
* Class contains methods for interacting with the user model.
*/
class UserService {
    constructor() {
        this.User = database.User;
    }

    /**
    * Method to retrieve user by email from the database.
    * @param {text} email email to search for in the database
    * @returns {Promise<boolean>} user model
    */
    async getUserByEmail(email) {
        try {
            const user = await this.User.findOne({
                where: { email }
            });
            return user;
        } catch (error) {
            logger.error("ERROR: An error occurred while retrieving user", error);
            throw new Error("An error occurred while. we're looking into it.");
        }
    }

    /**
   * Method to retrieve user by id from the database.
   * @param {text} id id to search for in the database
   * @returns {Promise<boolean>} user model
   */
    async getUserById(id) {
        try {
            const user = await this.User.findByPk(id);
            return user;
        } catch (error) {
            logger.error("ERROR: An error occurred while retrieving user", error);
            throw new Error("An error occurred while. we're looking into it.");
        }
    }

    /**
   * Method to store user in the database.
   * @param {object} userDetails  user details to store in the database
   * @returns {Promise<boolean>} user model
   */
    async storeUser(userDetails) {
        try {
            const newUser = await this.User.create({ ...userDetails });
            return newUser;
        } catch (error) {
            logger.error("ERROR: An error occurred while storing user", error);
            throw new Error("An error occurred while. we're looking into it.");
        }
    }
}

export default UserService;
