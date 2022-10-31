"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../app/utils");
require("../../../config/logger");
require("../../mock/mockLogger");
describe.only("Test random number generator class", () => {
    test.only("Should generate same random number: getConsistentRandomNumber", () => __awaiter(void 0, void 0, void 0, function* () {
        const randomNumber = new utils_1.RandomNumberHelper();
        expect(randomNumber.getConsistentRandomNumber)
            .toEqual(randomNumber.getConsistentRandomNumber);
    }));
    test.only("Should generate different random numbers: getConsistentRandomNumber", () => __awaiter(void 0, void 0, void 0, function* () {
        const randomNumber = utils_1.RandomNumberHelper.generateRandomNumber();
        const randomNumber2 = utils_1.RandomNumberHelper.generateRandomNumber();
        expect(randomNumber).not.toBeNull();
        expect(randomNumber2).not.toBeNull();
        expect(randomNumber).not.toEqual(randomNumber2);
    }));
});
