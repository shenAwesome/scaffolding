

const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');
const fs = require('fs');
const url = require('url');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const publicUrl = require(resolveApp('package.json')).homepage

const paths = {
    root: appDirectory,
    appBuild: resolveApp('build'),
    appStatic: resolveApp('static'),
    appHtml: resolveApp('static/index.html'),
    appIndexJs: resolveApp('src/index.tsx'),
    src: resolveApp('src'),
    css: resolveApp('src/css'),
    publicPath: resolveApp('public'),

}


const rules = [{
    test: /\.tsx?$/,
    include: paths.src,
    use: [{
        loader: 'ts-loader',
        options: {
            happyPackMode: true,
            experimentalWatchApi: true,
        },
    }],
}, {
    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
    loader: require.resolve('url-loader'),
    options: {
        limit: 10000,
        name: 'media/[name].[hash:8].[ext]',
    },
}, {
    test: /\.js$/,
    use: ['babel-loader']
}, {
    test: /\.scss$/,
    include: paths.css,
    use: ["style-loader", "css-loader", "sass-loader"]
}, {
    test: /\.css$/,
    use: ["style-loader", "css-loader"]
}, {
    exclude: [/\.js$/, /\.html$/, /\.json$/, /\.sass$/, /\.scss$/, /\.ejs$/],
    loader: require.resolve('file-loader'),
    options: {
        name: 'media/[name].[hash:8].[ext]',
    },
},]

const cfg = {
    mode: 'none',
    entry: {
        main: paths.appIndexJs
    },
    output: {
        filename: "[name].js",
        path: paths.appBuild,
    },
    module: {
        rules: [{ oneOf: rules }]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: paths.appHtml
        })
    ]
}

module.exports = { cfg, paths }
