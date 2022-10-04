/**
 * @description A function to mock logger calls
 */

import logger from "../../config/logger";

const mockLogger = () => {
    const LoggerInit = logger("test");
    global.logger = {
        error: jest.fn(() => LoggerInit.error),
        info: jest.fn(() => LoggerInit.info)
    };
    global.console = {
        log: console.log
    };
};

export default mockLogger();
