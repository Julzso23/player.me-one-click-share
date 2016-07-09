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
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: { presets: [ 'es2015', 'react' ] }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(png|json)$/,
                loader: 'file-loader',
                query: {
                    name: '[name].[ext]'
                }
            },
            {
                test   : /\.woff/,
                loader : 'url?prefix=font/&limit=10000&mimetype=application/font-woff'
            },
            {
                test   : /\.ttf/,
                loader : 'file?prefix=font/'
            },
            {
                test   : /\.eot/,
                loader : 'file?prefix=font/'
            },
            {
                test   : /\.svg/,
                loader : 'file?prefix=font/'
            }
        ]
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
