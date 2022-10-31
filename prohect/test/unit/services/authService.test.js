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
const authService_1 = __importDefault(require("../../../app/services/authService/authService"));
require("../../../config/logger");
require("../../mock/mockLogger");
require("../../mock/mockUserModel");
const userService_1 = __importDefault(require("../../../app/services/userService/userService"));
const hashText_1 = __importDefault(require("../../../app/utils/hashText"));
describe("Test token service", () => {
    let user;
    beforeEach(() => {
        user = {
            password: "newpassword",
            email: "newuseruu@mail.com",
            name: "cipher tech",
            phone_number: "06046363777",
            age: 28,
            date_of_birth: "1999-09-08"
        };
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe("Test register service", () => {
        jest.mock("../../../app/services/userService", () => jest.fn());
        test("should fail to generate token, invalid inputs: no password", () => __awaiter(void 0, void 0, void 0, function* () {
            const newUser = Object.assign(Object.assign({}, user), { password: null });
            const authService = new authService_1.default();
            const userData = authService.registerService;
            yield expect(userData(newUser)).rejects.toThrow("An error occurred please try again or contact support.");
        }));
        test("should create new user and generate token", () => __awaiter(void 0, void 0, void 0, function* () {
            const userToCreate = {
                id: 9,
                name: "new cipher",
                email: "newuser@mail.com",
                phone_number: "06046363777",
                age: 28,
                date_of_birth: "1991-09-08",
                created_at: "2022-07-09T16:55:11.936Z"
            };
            const authService = new authService_1.default();
            const userData = yield authService.registerService(user);
            yield expect(userData).not.toBeNull();
            yield expect(userData.userDetails).toEqual(userToCreate);
            yield expect(userData.token).toStrictEqual({
                access: {
                    token: expect.any(String),
                    expires: expect.any(Date)
                }
            });
        }));
        test("should fail to create new user(user already exists).", () => __awaiter(void 0, void 0, void 0, function* () {
            const userToCreate = {
                id: 9,
                name: "new cipher",
                password: "newPassword",
                email: "newuseruu@mail.com",
                phone_number: "06046363777",
                age: 28,
                date_of_birth: "1991-09-08",
                created_at: "2022-07-09T16:55:11.936Z"
            };
            jest.spyOn(userService_1.default.prototype, "getUserByEmail").mockImplementation(() => userToCreate);
            const authService = new authService_1.default();
            const userData = authService.registerService;
            yield expect(userData(userToCreate)).rejects.toThrow("User with email already exists");
        }));
    });
    describe("Test login service", () => {
        jest.mock("../../../app/services/userService", () => jest.fn());
        // jest.mock("../../../app/utils/hashText", () => jest.fn());
        beforeEach(() => {
            user = {
                password: "newpassword",
                email: "newuseru@mail.com",
                name: "cipher tech",
                phone_number: "06046363777",
                age: 28,
                date_of_birth: "1999-09-08"
            };
            jest.spyOn(userService_1.default.prototype, "getUserByEmail").mockImplementation(() => user);
        });
        afterEach(() => {
            jest.restoreAllMocks();
            jest.clearAllMocks();
        });
        test("Should fail to login: no email or password", () => __awaiter(void 0, void 0, void 0, function* () {
            const userToLoginNoEmail = {
                password: "newPassword"
            };
            const authService = new authService_1.default();
            const login = authService.loginService;
            yield expect(login(userToLoginNoEmail)).rejects.toThrow("Password and email are required");
            const userToLoginNoPassword = {
                email: "newuseruu@mail.com"
            };
            yield expect(login(userToLoginNoPassword)).rejects.toThrow("Password and email are required");
        }));
        test("Should fail to login: User doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
            const userToLogin = {
                password: "newPassword",
                email: "newuseruu@mail.com"
            };
            jest.spyOn(userService_1.default.prototype, "getUserByEmail").mockImplementation(() => null);
            const authService = new authService_1.default();
            const login = authService.loginService;
            yield expect(login(userToLogin)).rejects.toThrow("Invalid email or password please try again");
        }));
        test("Should fail to login: Passwords do not match", () => __awaiter(void 0, void 0, void 0, function* () {
            const userToLogin = {
                password: "newPass",
                email: "newuser@mail.com"
            };
            jest.spyOn(hashText_1.default, "verifyHash").mockImplementation(() => null);
            const authService = new authService_1.default();
            const login = yield authService.loginService;
            yield expect(login(userToLogin)).rejects.toThrow("Invalid email or password please try again");
        }));
        test("Should login in user successfully", () => __awaiter(void 0, void 0, void 0, function* () {
            const userToLogin = {
                password: "12345678",
                email: "newuser@mail.com"
            };
            const existingUser = {
                password: "$2b$12$LgD6TnbwvubkD3tOP.GHk.P59bRVlTQNpnd.MxOMRvdzyaPKrurLy",
                email: "newuseruu@mail.com",
                name: "cipher tech",
                phone_number: "06046363777",
                age: 28,
                date_of_birth: "1999-09-08",
                dataValues: {
                    password: "$2b$12$LgD6TnbwvubkD3tOP.GHk.P59bRVlTQNpnd.MxOMRvdzyaPKrurLy",
                    email: "newuseruu@mail.com",
                    name: "cipher tech",
                    phone_number: "06046363777",
                    age: 28,
                    date_of_birth: "1999-09-08"
                }
            };
            jest.spyOn(userService_1.default.prototype, "getUserByEmail").mockImplementation(() => existingUser);
            const authService = new authService_1.default();
            const login = yield authService.loginService(userToLogin);
            expect(login).not.toBeNull();
            yield expect(login).toStrictEqual({
                userDetails: {
                    email: "newuseruu@mail.com",
                    name: "cipher tech",
                    phone_number: "06046363777",
                    age: 28,
                    date_of_birth: "1999-09-08"
                },
                token: {
                    access: {
                        token: expect.any(String),
                        expires: expect.any(Date)
                    }
                }
            });
        }));
    });
});
