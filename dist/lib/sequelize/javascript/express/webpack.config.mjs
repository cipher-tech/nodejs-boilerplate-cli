"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const nodemon_webpack_plugin_1 = __importDefault(require("nodemon-webpack-plugin"));
const webpack_node_externals_1 = __importDefault(require("webpack-node-externals"));
const dirname = path_1.default.resolve();
exports.default = {
    target: "node",
    mode: "development",
    devtool: "eval",
    entry: path_1.default.resolve(dirname, "./index.js"),
    externalsPresets: { node: true },
    externals: [(0, webpack_node_externals_1.default)()],
    plugins: [
        new nodemon_webpack_plugin_1.default() // use nodemon to watch for changes
    ],
    node: {
        __dirname: true
    },
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
        extensions: ["*", ".js"],
        fallback: {
            fs: false
        }
    },
    output: {
        filename: "[name].js",
        path: path_1.default.resolve(dirname, "dist")
    }
};
