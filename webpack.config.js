const path = require('path')

const config = {
    entry: './src/client/app.js',
    output: {
        path: path.resolve(__dirname,'public/js'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
            },
            {
                use:['style-loader', 'css-loader'],
                test: /\.css$/
            }
        ]
    }
}

module.exports = config
