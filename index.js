import dotenv from "dotenv";
import express from "express";
import config from "./config";
import expressConfig from "./config/express";

dotenv.config();
const app = express();

const port = config.PORT || 3333;

// calls the express configuration on the app
expressConfig.run(app);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
