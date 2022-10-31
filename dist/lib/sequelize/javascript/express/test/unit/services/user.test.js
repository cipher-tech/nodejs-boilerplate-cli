"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable object-shorthand */
/* eslint-disable arrow-body-style */
require("../../../config/logger");
const userService_1 = __importDefault(require("../../../app/services/userService"));
require("../../mock/mockUserModel");
require("../../mock/mockLogger");
describe.only("Test methods in UserService", () => {
    jest.mock("../../../app/services/userService", () => jest.fn());
    test("should fetch users :::getUsers", () => __awaiter(void 0, void 0, void 0, function* () {
        const users = {
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
        const userService = new userService_1.default();
        const data = yield userService.getUsers();
        yield expect(users).toEqual(data);
    }));
    test("Should fail to fetch users :::getUsers", () => __awaiter(void 0, void 0, void 0, function* () {
        const userService = new userService_1.default();
        const result = yield userService.getUsers;
        yield expect(result).rejects.toThrow("An error occurred. we're looking into it.");
    }));
    test("should fetch user by email :::getUserByEmail", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            id: 9,
            name: "cipher tech",
            email: "newuser@mail.com",
            phone_number: "06046363777",
            age: 28,
            date_of_birth: "1999-09-08",
            created_at: "2022-07-09T16:55:11.936Z"
        };
        const userService = new userService_1.default();
        const data = yield userService.getUserByEmail("newuser@mail.com");
        yield expect(user).toEqual(data);
    }));
    test("Should fail to fetch user :::getUserByEmail", () => __awaiter(void 0, void 0, void 0, function* () {
        const userService = new userService_1.default();
        const result = yield userService.getUserByEmail;
        yield expect(result).rejects.toThrowError("An error occurred. we're looking into it");
    }));
    test("should fetch user by ID :::getUserById", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            id: 9,
            name: "cipher tech",
            email: "newuser@mail.com",
            phone_number: "06046363777",
            age: 28,
            date_of_birth: "1999-09-08",
            created_at: "2022-07-09T16:55:11.936Z"
        };
        const userService = new userService_1.default();
        const data = yield userService.getUserById(9);
        yield expect(user).toEqual(data);
    }));
    test("Should fail to fetch user by ID(no ID supplied) :::getUserById", () => __awaiter(void 0, void 0, void 0, function* () {
        const userService = new userService_1.default();
        const result = yield userService.getUserById;
        yield expect(result).rejects.toThrowError("An error occurred. we're looking into it.");
    }));
    test("Should fail to fetch user by ID(string passed in) :::getUserById", () => __awaiter(void 0, void 0, void 0, function* () {
        const userService = new userService_1.default();
        const result = yield userService.getUserById;
        yield expect(result("string")).rejects.toThrowError("An error occurred. we're looking into it.");
    }));
    test("should create user :::storeUser", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            dataValues: {
                id: 9,
                name: "new cipher",
                email: "newuser@mail.com",
                phone_number: "06046363777",
                age: 28,
                password: "newpassword",
                date_of_birth: "1991-09-08",
                created_at: "2022-07-09T16:55:11.936Z"
            }
        };
        const userService = new userService_1.default();
        const data = yield userService.storeUser(user);
        yield expect(user).toEqual(data);
    }));
    test("Should fail to create user(string passed in) :::storeUser", () => __awaiter(void 0, void 0, void 0, function* () {
        const userService = new userService_1.default();
        const result = yield userService.storeUser;
        yield expect(result()).rejects.toThrowError("An error occurred. we're looking into it");
    }));
    test("Should fail to create user(Wrong call) :::storeUser", () => __awaiter(void 0, void 0, void 0, function* () {
        const userService = new userService_1.default();
        const result = yield userService.storeUser;
        yield expect(result("string")).rejects.toThrowError("An error occurred. we're looking into it");
    }));
});
