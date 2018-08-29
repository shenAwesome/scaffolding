const { cfg, paths } = require('./webpack.base'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    MiniCssExtractPlugin = require("mini-css-extract-plugin"),
    { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer'),
    ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin'),
    webpack = require('webpack')

const ExtractCSS = false

Object.assign(cfg, {
    mode: 'production',
    //devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin(['build'], {
            root: paths.root,
            verbose: true,
            dry: false
        }),
        new BundleAnalyzerPlugin(),
        ...cfg.plugins
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
})

if (ExtractCSS) {
    const loader = {
        loader: MiniCssExtractPlugin.loader,
        options: {
            // you can specify a publicPath here
            // by default it use publicPath in webpackOptions.output
            // publicPath: '../'
        }
    }
    Object.assign(cfg, {
        module: {
            rules: [{
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }, {
                "test": /\.scss$/,
                "use": [loader, "css-loader", "sass-loader"]
            }, {
                "test": /\.css$/,
                "use": [loader, "css-loader"]
            }]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css"
            }),
            new ForkTsCheckerWebpackPlugin,
            ...cfg.plugins
        ]
    })
}

module.exports = cfg