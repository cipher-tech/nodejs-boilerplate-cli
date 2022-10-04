import express from "express";
import Response from "../app/utils/responseHandler";
import AuthRoute from "./v1/authRoute";
import UserRoute from "./v1/userRoute";

/**
 * Main Router that contains Application routes
 * @returns {expressRouterObject} this.routes
 */

class Router {
    constructor() {
        this.router = express.Router();
        this.response = null;
        // instantiates the class where we define our authentication routes
        // and adds the authentication routes defined in the class to our routes
        this.authRoute = new AuthRoute(this.router);
        this.userRoute = new UserRoute(this.router);
    }

    indexRoute() {
        this.router.get("/", (req, res) => {
            this.response = new Response(req, res);
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

export default Router;
