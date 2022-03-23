import express from "express";
import webpack from "webpack"; // eslint-disable-line
import webpackDevMiddleware from 'webpack-dev-middleware'; // eslint-disable-line
import "dotenv/config";
import config from "./webpack.config.cjs";

const app = express();
const compiler = webpack(config);

const port = process.env.PORT || 3333;

app.use(
    webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath
    })
);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`); // eslint-disable-line
});
