"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
/**
* A utility class for generating both new and consistent random numbers
*/
class RandomNumberHelper {
    constructor() {
        this.consistentRandomNumber = null;
        if (this.consistentRandomNumber === null) {
            this.consistentRandomNumber = (0, uuid_1.v4)();
        }
    }
    /**
    * Method for generating consistent random number
    * @returns {string} randomNumber
    */
    get getConsistentRandomNumber() {
        return this.consistentRandomNumber;
    }
}
/**
* Method for generating new random number
* @returns {string} randomNumber
*/
RandomNumberHelper.generateRandomNumber = () => {
    const randomNumber = (0, uuid_1.v4)();
    return randomNumber;
};
exports.default = RandomNumberHelper;
