const { cfg, paths } = require('./webpack.base')
const webpack = require('webpack');

Object.assign(cfg, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: paths.appBuild,
        compress: true,
        hot: true,
        port: 9000
    },
    plugins: [
        ...cfg.plugins,
        new webpack.HotModuleReplacementPlugin()
    ]
})

module.exports = cfg