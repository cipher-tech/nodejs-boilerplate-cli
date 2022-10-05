import { ValidationError } from "joi";

import ApiError from "../../../app/exceptions/apiError";
import "../../../config/logger";
import "../../mock/mockLogger";

describe("Test error handler", () => {
    test("test appError", () => {
        const errorHandler = new ApiError();
        const error = {
            code: 400,
            status: "test error",
            message: "Test error",
            details: [{
                message: "Error from test"
            }],
            stack: "test/unit/exceptions/apiError.test.js"
        };
        const req = {
            originalUrl: "Localhost",
            method: "POST",
            ip: "127.0.0.1"
        };
        const res = {

            status: () => ({
                json: () => true
            })
        };

        const next = (err) => `error object ${err}`;
        const response = errorHandler.appError(error, req, res, next);

        expect(response).not.toBeNull();
    });
    test("test appError: ValidationError", () => {
        const errorHandler = new ApiError();
        class Error extends ValidationError {
            constructor() {
                super();
                this.code = 400;
                this.status = "test error";
                this.message = "Test error";
                this.details = [{
                    message: "Error from test"
                }];
                this.stack = "test/unit/exceptions/apiError.test.js";
            }
        }
        const req = {
            originalUrl: "Localhost",
            method: "POST",
            ip: "127.0.0.1"
        };
        const res = {

            status: () => ({
                json: () => true
            })
        };

        const error = new Error();
        const next = (err) => `error object ${err}`;
        const response = errorHandler.appError(error, req, res, next);

        expect(response).not.toBeNull();
    });
    test("test genericError", () => {
        const errorHandler = new ApiError();
        const error = {
            code: 400,
            status: "test error",
            message: "Test error",
            details: [{
                message: "Error from test"
            }],
            stack: "test/unit/exceptions/apiError.test.js"
        };
        const req = {
            originalUrl: "Localhost",
            method: "POST",
            ip: "127.0.0.1"
        };
        const res = {

            status: () => ({
                json: () => true
            })
        };

        const next = (err) => `error object ${err}`;
        const response = errorHandler.genericError(error, req, res, next);

        expect(response).not.toBeNull();
    });
});
