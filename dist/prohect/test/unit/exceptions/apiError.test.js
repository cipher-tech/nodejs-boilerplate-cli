"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = require("joi");
const apiError_1 = __importDefault(require("../../../app/exceptions/apiError"));
require("../../../config/logger");
require("../../mock/mockLogger");
describe("Test error handler", () => {
    test("test appError", () => {
        const errorHandler = new apiError_1.default();
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
        const errorHandler = new apiError_1.default();
        class Error extends joi_1.ValidationError {
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
        const errorHandler = new apiError_1.default();
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
