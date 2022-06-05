import "dotenv/config";
import express from "express";
import config from "./config";
import expressConfig from "./config/express";

// Instantiates the express package
const app = express();

// Sets the port the app will run on from environment variable or a default port 4400
const port = config.PORT || 4400;

// calls the express configuration method with express app as argument
expressConfig.run(app);

// Starts the server
app.listen(port, () => {
    logger.info("Server running");
    console.log(`Server is listening on port ${port}`);
});
