// eslint-disable-next-line
const path = require("path");
const nodeExternals = require("webpack-node-externals"); // eslint-disable-line
// eslint-disable-next-line
module.exports = {
    target: "node",
    mode: "development",
    devtool: "eval",
    entry: path.resolve(__dirname, "./index.js"), // eslint-disable-line
    externalsPresets: { node: true }, // in order to ignore built-in modules like path, fs, etc.
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            }
        ]
    },
    resolve: {
        extensions: ["*", ".js"]
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"), // eslint-disable-line
        clean: true,
        publicPath: "/"
    },
    devServer: {
        static: path.resolve(__dirname, "dist") // eslint-disable-line
    }
};
