/* eslint-disable arrow-body-style */
import AuthService from "../../../app/services/authService";
import "../../mock/mockUserModel";
import "../../mock/mockLogger";
// import UserService from "../../../app/services/userService";

describe.only("Test methods in AuthService", () => {
    // test("should fail to register user : (User with email already exists); :::registerService", async () => {
    //     const body = {
    //         password: "12345678",
    //         email: "newuser@mail.com",
    //         name: "test",
    //         phone_number: "08099277727",
    //         age: 29,
    //         date_of_birth: "1999-09-08"
    //     };

    //     const authService = new AuthService();
    //     const data = await authService.registerService(body);
    //     expect(data).rejects.toThrow("User with email already exists");
    // });

    test("should register user :::registerService", async () => {
        jest.mock("../../../app/services/userService");

        const body = {
            name: "cipher tech",
            email: "newUse2r@mail.com",
            age: 23,
            phone_number: "06046363777",
            password: "12345678",
            date_of_birth: "1999-09-08T23:00:00.000Z"
        };

        const authService = new AuthService();
        const data = await authService.registerService(body);
        expect(data).toEqual(body);
    });
});
