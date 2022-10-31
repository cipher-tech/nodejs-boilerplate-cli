"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../../app/http/controllers");
const middleware_1 = __importDefault(require("../../app/http/middleware"));
const authValidator_1 = __importDefault(require("../../app/http/validator/authValidator"));
/**
* A router class that holds all routes related to authentication
* You can instantiate your controller class in the constructor method
* and attach it to a route path in the `routes` method.
* @param {object} router express router object
*/
class AuthRoute {
    constructor(router) {
        this.router = router;
        // Instantiate controllers and validator classes before attaching them to the routes
        this.authValidator = new authValidator_1.default();
        this.authController = new controllers_1.AuthController();
        this.authMiddleware = new middleware_1.default();
        // this.routes();
    }
    run() {
        this.routes();
        return this.router;
    }
    /**
     * You can define all the different endpoints related to the AuthRoute class
     * in the routes method and attach it to a controller function/method.
     */
    routes() {
        this.router.post("/register", this.authValidator.registerValidator, this.authController.register);
        this.router.post("/login", this.authValidator.loginValidator, this.authController.login);
    }
}
exports.default = AuthRoute;
