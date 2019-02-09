const path = require('path')

const config = {
    mode : "development",
    entry: './src/client/app.js',
    output: {
        path: path.resolve(__dirname,'public/js'),
        filename: 'bundle.js'
    },
    devtool: 'inline-source-map',
    devServer: {
     contentBase: path.resolve(__dirname,'public/js')
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                      presets: ['@babel/preset-env'],
                      plugins: ['@babel/plugin-proposal-object-rest-spread']
                    }
                  }
            }
        ]
    }
}

module.exports = config
