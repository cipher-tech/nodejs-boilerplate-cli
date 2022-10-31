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
const responseHandler_1 = __importDefault(require("../../../app/utils/responseHandler"));
require("../../../config/logger");
require("../../mock/mockLogger");
describe.only("Test response handler", () => {
    test.only("Should fail to send success response: no argument passed", () => __awaiter(void 0, void 0, void 0, function* () {
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
        const response = new responseHandler_1.default(req, res);
        const result = response.success();
        expect(result).toEqual(new Error("Error: Arguments to the success response handler cannot be empty"));
    }));
    test.only("Should send success response", () => __awaiter(void 0, void 0, void 0, function* () {
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
        const response = new responseHandler_1.default(req, res);
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
    }));
});
