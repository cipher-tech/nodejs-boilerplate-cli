/**
 * @description A function to mock logger calls
 */

const mockLogger = () => {
    global.logger = {
        error: jest.fn(),
        info: jest.fn()
    };
    global.console = {
        log: jest.fn()
    };
};

export default mockLogger();
