import TokenService from "../../../app/services/tokenService";
import "../../../config/logger";
import "../../mock/mockLogger";

describe("Test token service", () => {
    test("should generate token", async () => {
        const user = {
            id: 9,
            email: "newuser@mail.com"
        };
        const tokenService = new TokenService();

        const token = await tokenService.generateAuthToken(user);
        expect(token).not.toBeNull();
        expect(token).toStrictEqual({
            access: {
                token: expect.any(String),
                expires: expect.any(Date)
            }
        });
    });
    test("should fail to generate token(user object is null)", async () => {
        const tokenService = new TokenService();

        const token = await tokenService.generateAuthToken;
        await expect(token).rejects.toThrowError("We've encountered an issue. Please retry in a few minutes.");
    });
});
