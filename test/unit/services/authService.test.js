import AuthService from "../../../app/services/authService/authService";
import "../../../config/logger";
import "../../mock/mockLogger";
import "../../mock/mockUserModel";
import UserService from "../../../app/services/userService/userService";
import HashText from "../../../app/utils/hashText";

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
        test("should fail to generate token, invalid inputs: no password", async () => {
            const newUser = {
                ...user,
                password: null
            };
            const authService = new AuthService();

            const userData = authService.registerService;

            await expect(userData(newUser)).rejects.toThrow("An error occurred please try again or contact support.");
        });
        test("should create new user and generate token", async () => {
            const userToCreate = {
                id: 9,
                name: "new cipher",
                email: "newuser@mail.com",
                phone_number: "06046363777",
                age: 28,
                date_of_birth: "1991-09-08",
                created_at: "2022-07-09T16:55:11.936Z"
            };
            const authService = new AuthService();

            const userData = await authService.registerService(user);
            await expect(userData).not.toBeNull();
            await expect(userData.userDetails).toEqual(userToCreate);
            await expect(userData.token).toStrictEqual({
                access: {
                    token: expect.any(String),
                    expires: expect.any(Date)
                }
            });
        });

        test("should fail to create new user(user already exists).", async () => {
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

            jest.spyOn(UserService.prototype, "getUserByEmail").mockImplementation(() => userToCreate);
            const authService = new AuthService();

            const userData = authService.registerService;

            await expect(userData(userToCreate)).rejects.toThrow("User with email already exists");
        });
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
            jest.spyOn(UserService.prototype, "getUserByEmail").mockImplementation(() => user);
        });
        afterEach(() => {
            jest.restoreAllMocks();
            jest.clearAllMocks();
        });
        test("Should fail to login: no email or password", async () => {
            const userToLoginNoEmail = {
                password: "newPassword"
            };
            const authService = new AuthService();
            const login = authService.loginService;

            await expect(login(userToLoginNoEmail)).rejects.toThrow("Password and email are required");

            const userToLoginNoPassword = {
                email: "newuseruu@mail.com"
            };

            await expect(login(userToLoginNoPassword)).rejects.toThrow("Password and email are required");
        });
        test("Should fail to login: User doesn't exist", async () => {
            const userToLogin = {
                password: "newPassword",
                email: "newuseruu@mail.com"
            };
            jest.spyOn(UserService.prototype, "getUserByEmail").mockImplementation(() => null);
            const authService = new AuthService();
            const login = authService.loginService;

            await expect(login(userToLogin)).rejects.toThrow("Invalid email or password please try again");
        });
        test("Should fail to login: Passwords do not match", async () => {
            const userToLogin = {
                password: "newPass",
                email: "newuser@mail.com"
            };
            jest.spyOn(HashText, "verifyHash").mockImplementation(() => null);
            const authService = new AuthService();
            const login = await authService.loginService;
            await expect(login(userToLogin)).rejects.toThrow("Invalid email or password please try again");
        });
        test("Should login in user successfully", async () => {
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
            jest.spyOn(UserService.prototype, "getUserByEmail").mockImplementation(() => existingUser);
            const authService = new AuthService();
            const login = await authService.loginService(userToLogin);

            expect(login).not.toBeNull();
            await expect(login).toStrictEqual({
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
        });
    });
});
