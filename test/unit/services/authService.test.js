import AuthService from "../../../app/services/authService/authService";
import "../../../config/logger";
import "../../mock/mockLogger";
import "../../mock/mockUserModel";

describe.only("Test token service", () => {
    jest.mock("../../../app/services/userService", () => jest.fn());

    test("should generate token", async () => {
        const user = {
            email: "newuseruu@mail.com",
            password: "newpassword",
            name: "cipher tech",
            phone_number: "06046363777",
            age: 28,
            date_of_birth: "1999-09-08"
        };
        const authService = new AuthService();

        const userData = await authService.registerService(user);
        await expect(userData).not.toBeNull();
    });
    // test("should fail to generate token(user object is null)", async () => {
    //     const tokenService = new TokenService();

    //     const token = await tokenService.generateAuthToken;
    //     await expect(token).rejects.toThrowError("We've encountered an issue. Please
    // retry in a few minutes.");
    // });
});
