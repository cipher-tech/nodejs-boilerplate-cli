"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../../app/http/controllers");
/**
* A router class that holds all routes related to User
* You can instantiate your controller class in the constructor method
* and attach it to a route path in the `routes` method.
* @param {object} router express router object
*/
class UserRoute {
    constructor(router) {
        this.router = router;
        // Instantiate controllers and validator classes before attaching them to the routes
        this.userController = new controllers_1.UserController();
    }
    run() {
        this.routes();
        return this.router;
    }
    /**
     * You can define all the different endpoints related to the UserRoute class
     * in the routes method and attach it to a controller function/method.
     */
    routes() {
        this.router.get("/", this.userController.getUsers);
    }
}
exports.default = UserRoute;
