import AuthController from "../app/http/controllers/authController";

/**
 * AuthRoute contains authentication routes
 * @returns {object} this.routes
 */

class AuthRoute {
    /**
     * You can instantiate your controllers in a routes controller and call it in the routes method.
     * @param {object} router express router object
     */
    constructor(router) {
        this.router = router;
        this.authController = new AuthController();

        this.routes();
    }

    /**
     * You define your route endpoints and attach it to a controller function/method.
     */
    routes() {
        this.router.get("/register", this.authController.register);
    }
}

export default AuthRoute;
