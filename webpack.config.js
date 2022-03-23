// eslint-disable-next-line
const path = require('path');

// eslint-disable-next-line
module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: path.resolve(__dirname, './index.js'), // eslint-disable-line
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader' ]
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'), // eslint-disable-line
        clean: true
    },
    devServer: {
        static: path.resolve(__dirname, 'dist') // eslint-disable-line
    }
};
