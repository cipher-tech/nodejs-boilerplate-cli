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
    async getUsers() {
        try {
            const users = await this.User.findAll({
                attributes: { exclude: ["password", "updated_at"] }
            });
            return users;
        } catch (error) {
            logger.error("ERROR: An error occurred while retrieving users in userService.js", error);
            throw new Error("An error occurred. we're looking into it.");
        }
    }

    async getUserByEmail(email) {
        try {
            const emailToLowerCase = email.toLowerCase();
            const user = await this.User.findOne({
                where: { email: emailToLowerCase }
            });
            return user;
        } catch (error) {
            logger.error("ERROR: An error occurred while retrieving user in userService.js", error);
            throw new Error("An error occurred. we're looking into it.");
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
            logger.error("ERROR: An error occurred while retrieving user in userService.js", error);
            throw new Error("An error occurred. we're looking into it.");
        }
    }

    /**
   * Method to store user in the database.
   * @param {object} userDetails  user details to store in the database
   * @returns {Promise<boolean>} user model
   */
    async storeUser(userDetails) {
        try {
            const newUser = await this.User.create({
                name: "cipher tech",
                email: "newUse2r@mail.com",
                age: 23,
                phone_number: "06046363777",
                password: "12345678",
                date_of_birth: "1999-09-08T23:00:00.000Z",
                created_at: "2022-07-22 13:04:34.713 +00:00",
                updated_at: "2022-07-22 13:04:34.713 +00:00"
            });
            return newUser;
        } catch (error) {
            logger.error("ERROR: An error occurred while storing user in userService.js", error);
            throw new Error("An error occurred. we're looking into it.");
        }
    }
}

export default UserService;
