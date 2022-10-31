"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const express_2 = __importDefault(require("./config/express"));
// Instantiates the express package
const app = (0, express_1.default)();
// Sets the port the app will run on from environment variable or a default port 4400
const port = config_1.default.PORT || 4400;
// calls the express configuration method with express app as argument
express_2.default.run(app);
// Starts the server
app.listen(port, () => {
    logger.info("Server running");
    console.log(`Server is listening on port ${port}`);
});
