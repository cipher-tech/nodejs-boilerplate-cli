import "dotenv/config";
import express from "express";
import cors from "cors";
import config from "./config";
import expressConfig from "./config/express";

const app = express();

const port = process.env.PORT || 3333;

// enable cors
app.use(cors());
app.options("*", cors());

// parse json request
app.use(express.json());

// parse urlencoded request
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Server running");
});

// calls the express configuration on the app
expressConfig.run(app);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
