import Response from "../../../app/utils/responseHandler";
import "../../../config/logger";
import "../../mock/mockLogger";

describe.only("Test response handler", () => {
    test.only("Should fail to send success response: no argument passed", async () => {
        const req = {
            originalUrl: "Localhost",
            method: "POST",
            ip: "127.0.0.1"
        };
        const res = {
            status: () => ({
                json: () => ({
                    data: { message: "A returned response" }
                })
            })
        };

        const response = new Response(req, res);
        const result = response.success();
        expect(result).toEqual(new Error("Error: Arguments to the success response handler cannot be empty"));
    });
    test.only("Should send success response", async () => {
        const req = {
            originalUrl: "Localhost",
            method: "POST",
            ip: "127.0.0.1"
        };
        const res = {
            status: () => ({
                json: () => ({
                    data: { message: "A returned response" }
                })
            })
        };

        const response = new Response(req, res);
        const result = response.success({
            message: "Testing",
            data: {
                success: "true"
            }
        });
        expect(result).not.toBeNull();
        expect(result).toStrictEqual({
            data: {
                message: expect.any(String)
            }
        });
    });
});
