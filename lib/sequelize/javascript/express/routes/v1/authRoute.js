import { AuthController } from "../../app/http/controllers";
import AuthMiddleware from "../../app/http/middleware";
import AuthValidator from "../../app/http/validator/authValidator";

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
        this.authValidator = new AuthValidator();
        this.authController = new AuthController();
        this.authMiddleware = new AuthMiddleware();
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
        this.router.post(
            "/register",
            this.authValidator.registerValidator,
            this.authController.register
        );
        this.router.post(
            "/login",
            this.authValidator.loginValidator,
            this.authController.login
        );
    }
}

export default AuthRoute;
