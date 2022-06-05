import database from "../../../database";

class UserService {
    constructor() {
        this.User = database.User;
    }

    async getUserByEmail(email) {
        try {
            const user = await this.User.findOne({ where: { email } });
            return user;
        } catch (error) {
            logger.error("ERROR: An error occurred while retrieving user", error);
            throw new Error("An error occurred while. we're looking into it.");
        }
    }

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
