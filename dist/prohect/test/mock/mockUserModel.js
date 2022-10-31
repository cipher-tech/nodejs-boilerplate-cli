"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../database"));
/**
 * @description A function to mock database calls
 */
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
    name: "new cipher",
    email: "newuser@mail.com",
    phone_number: "06046363777",
    age: 28,
    password: "newpassword",
    date_of_birth: "1991-09-08",
    created_at: "2022-07-09T16:55:11.936Z"
};
const allUsers = {
    data: [
        {
            age: 23,
            date_of_birth: "1999-09-08",
            email: "test@example.com",
            id: 2,
            name: "cipher",
            phone_number: "09000099777",
            created_at: "2022-07-20T23:00:00.000Z"
        }
    ]
};
const mockDatabase = () => {
    jest.mock("../../database", () => jest.fn());
    const dbUser = database_1.default.User;
    dbUser.findAll = jest.fn(() => allUsers);
    dbUser.findOne = jest.fn().mockImplementation((data = {}) => {
        const { where } = data;
        if (where != null && where.email && where.email === "newuser@mail.com") {
            return user;
        }
        return null;
    });
    dbUser.findByPk = jest.fn().mockImplementation(() => user);
    dbUser.create = jest.fn().mockImplementation(() => ({
        dataValues: Object.assign({}, newUser)
    }));
};
exports.default = mockDatabase();
