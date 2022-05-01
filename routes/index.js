import express from "express";
import Response from "../app/utils/responseHandler";

/**
 * Main Router that contains Application routes
 * @returns {object} this.routes
 */

class Router {
    constructor() {
        this.router = express.Router();
        this.response = null;
    }

    indexRoute() {
        return this.router.get("/", (req, res) => {
            this.response = new Response(req, res);
            this.response.success({
                message: "Welcome.",
                data: []
            });
        });
    }

    run() {
        this.indexRoute();

        return this.router;
    }
}

export default Router;
