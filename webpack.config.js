module.exports = {
    entry: {
        app: './src/init.js'
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
    devtool: 'source-map'
};
