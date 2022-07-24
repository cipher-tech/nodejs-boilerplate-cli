/**
 * @description A function to mock logger calls
 */

import logger from "../../config/logger";

const mockLogger = () => {
    const LoggerInit = logger("test");
    global.logger = {
        error: jest.fn(() => LoggerInit),
        info: jest.fn(() => LoggerInit)
    };
    // global.console = {
    //     log: jest.fn()
    // };
};

export default mockLogger();
