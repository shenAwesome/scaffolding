const { cfg, paths } = require('./webpack.base')
const webpack = require('webpack')
//const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

Object.assign(cfg, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    output: {
        ...cfg.output,
        pathinfo: false
    },
    devServer: {
        contentBase: paths.appStatic,
        compress: true,
        hot: true,
        port: 9000
    },
    plugins: [
        ...cfg.plugins,
        new webpack.HotModuleReplacementPlugin,
        //new HardSourceWebpackPlugin
    ],
    optimization: {
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
    }
})

module.exports = cfg