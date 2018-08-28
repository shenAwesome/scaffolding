

const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');
const fs = require('fs');
const url = require('url');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const paths = {
    buildDir: resolveApp('build')
}

const cfg = {
    mode: 'none',
    entry: {
        main: './src/index.tsx'
    },
    output: {
        filename: "[name].js",
        path: paths.buildDir
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }, {
            "test": /\.scss$/,
            "use": ["style-loader", "css-loader", "sass-loader"]
        }, {
            "test": /\.css$/,
            "use": ["style-loader", "css-loader"]
        }]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            meta: { viewport: 'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no' }
        })
    ]
}

module.exports = { cfg, paths }