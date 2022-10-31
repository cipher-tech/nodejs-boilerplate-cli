"use strict";
/**
 * @description A function to mock logger calls
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../config/logger"));
const mockLogger = () => {
    const LoggerInit = (0, logger_1.default)("test");
    global.logger = {
        error: jest.fn(() => LoggerInit.error),
        info: jest.fn(() => LoggerInit.info)
    };
    global.console = {
        log: console.log
    };
};
exports.default = mockLogger();
