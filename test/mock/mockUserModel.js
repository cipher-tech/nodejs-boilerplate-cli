import database from "../../database";

/**
 * @description A function to mock database calls
 */

const mockDatabase = () => {
    jest.mock("../../database");
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
    const newUser = {
        id: 9,
        name: "cipher tech",
        email: "newuser@mail.com",
        phone_number: "06046363777",
        age: 28,
        date_of_birth: "1999-09-08",
        created_at: "2022-07-09T16:55:11.936Z"
    };

    dbUser.findOne = jest.fn().mockImplementation((data = {}) => {
        const { where } = data;
        // console.log("in TESTSTST", data);
        if (where != null && where.email && where.email === "newuser@mail.com") {
            return user;
        }
        return null;
    });
    dbUser.findByPk = jest.fn().mockReturnValue(user);
    // dbUser.create = jest.fn().mockReturnValue(newUser);
    dbUser.findAll = jest.fn().mockReturnValue(allUsers);
};

export default mockDatabase();
