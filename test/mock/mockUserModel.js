import database from "../../database";

/**
 * @description A function to mock database calls
 */

const mockDatabase = () => {
    const dbUser = database.User;
    const allUsers = {
        data: [
            {
                id: 9,
                name: "cipher tech",
                email: "newuser@mail.com",
                phone_number: "06046363777",
                age: 28,
                date_of_birth: "1999-09-08",
                created_at: "2022-07-09T16:55:11.936Z"
            }
        ]
    };

    const user = {
        id: 9,
        name: "cipher tech",
        email: "newuser@mail.com",
        phone_number: "06046363777",
        age: 28,
        date_of_birth: "1999-09-08",
        created_at: "2022-07-09T16:55:11.936Z"
    };

    dbUser.findOne = jest.fn().mockReturnValueOnce(user);
    dbUser.findByPk = jest.fn().mockReturnValueOnce(user);
    dbUser.create = jest.fn().mockReturnValueOnce(user);
    dbUser.findAll = jest.fn().mockReturnValueOnce(allUsers);
};

export default mockDatabase();
