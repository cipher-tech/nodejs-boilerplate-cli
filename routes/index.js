import express from "express";
import Response from "../app/utils/responseHandler";
import AuthRoute from "./v1/authRoute";

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

        this.indexRoute();
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
        return this.router;
    }
}

export default Router;
