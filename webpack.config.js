const path = require('path')

const config = {
    entry: './src/client/app.js',
    output: {
        path: path.resolve(__dirname,'public/js'),
        filename: 'bundle.js'
    },
    devtool: 'inline-source-map',
    mode: 'development',
    module: {
        rules: [
            {   
                exclude: /(node_modules|bower_components)/,
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-object-rest-spread']
                      }
                  }
            },
            {
                use:['style-loader', 'css-loader'],
                test: /\.css$/
            }
        ]
    }
}

module.exports = config
