"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const responseHandler_1 = __importDefault(require("../app/utils/responseHandler"));
const authRoute_1 = __importDefault(require("./v1/authRoute"));
const userRoute_1 = __importDefault(require("./v1/userRoute"));
/**
 * Main Router that contains Application routes
 * @returns {expressRouterObject} this.routes
 */
class Router {
    constructor() {
        this.router = express_1.default.Router();
        this.response = null;
        // instantiates the class where we define our authentication routes
        // and adds the authentication routes defined in the class to our routes
        this.authRoute = new authRoute_1.default(this.router);
        this.userRoute = new userRoute_1.default(this.router);
    }
    indexRoute() {
        this.router.get("/", (req, res) => {
            this.response = new responseHandler_1.default(req, res);
            this.response.success({
                message: "Welcome.",
                data: []
            });
        });
    }
    run() {
        this.router.use("/auth", this.authRoute.run());
        this.router.use("/users", this.userRoute.run());
        this.indexRoute();
        return this.router;
    }
}
exports.default = Router;
