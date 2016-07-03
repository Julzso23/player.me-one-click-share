const HtmlWebpackPlugin = require('webpack-html-plugin');

module.exports = {
    entry: {
        app: __dirname + '/src/init.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: { presets: [ 'es2015', 'react' ] }
        },
        {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            'filename': 'popup.html',
            'template': __dirname + '/src/popup.html',
            'inject': false
        })
    ],
    devtool: 'source-map'
};
