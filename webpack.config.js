var path = require('path');

module.exports = {
    entry: path.join(__dirname, 'app/app.js'),
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'app-bundle.js'
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },

    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true,
        inline: true
    }
};
