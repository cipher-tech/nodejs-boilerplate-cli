import { AuthController } from "../../app/http/controllers";
import AuthMiddleware from "../../app/http/middleware";
import AuthValidator from "../../app/http/validator/authValidator";

/**
 * AuthRoute contains authentication routes
 * @returns {object} this.routes
 */

class AuthRoute {
    /**
     * You can instantiate your controller class in the constructor method
     * and attach it to a route path in the routes method.
     * @param {object} router express router object
     */
    constructor(router) {
        this.router = router;
        this.authValidator = new AuthValidator();
        this.authController = new AuthController();
        this.authMiddleware = new AuthMiddleware();
        this.routes();
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
            this.authValidator.registerValidator,
            this.authMiddleware.userAuth,
            this.authController.login
        );
    }
}

export default AuthRoute;
