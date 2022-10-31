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
const tokenService_1 = __importDefault(require("../../../app/services/tokenService"));
require("../../../config/logger");
require("../../mock/mockLogger");
describe("Test token service", () => {
    test("should generate token", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            id: 9,
            email: "newuser@mail.com"
        };
        const tokenService = new tokenService_1.default();
        const token = yield tokenService.generateAuthToken(user);
        expect(token).not.toBeNull();
        expect(token).toStrictEqual({
            access: {
                token: expect.any(String),
                expires: expect.any(Date)
            }
        });
    }));
    test("should fail to generate token(user object is null)", () => __awaiter(void 0, void 0, void 0, function* () {
        const tokenService = new tokenService_1.default();
        const token = yield tokenService.generateAuthToken;
        yield expect(token).rejects.toThrowError("We've encountered an issue. Please retry in a few minutes.");
    }));
});
