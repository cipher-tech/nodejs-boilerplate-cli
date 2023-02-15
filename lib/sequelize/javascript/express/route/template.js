/**
* A router class that holds all routes related to UserRoute
* You can instantiate your controller class in the constructor method
* and attach it to a route path in the `routes` method.
* @param {object} router express router object
*/
class UserRoute {
    constructor(router) {
        this.router = router;
        // Instantiate controllers and validator classes before attaching them to the routes
        this.controller = () => "Testing 1 2 3";
    }

    // Configures routes
    run() {
        this.routes();
        return this.router;
    }

    /**
     * You can define all the different endpoints related to the UserRoute class
     * in the routes method and attach it to a controller function/method.
     */
    routes() {
        this.router.get(
            "/",
            this.controller()
        );
    }
}

export default UserRoute;
