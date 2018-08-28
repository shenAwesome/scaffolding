const { cfg, paths } = require('./webpack.base')
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

Object.assign(cfg, {
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(['dist']),
        ...cfg.plugins,
        new BundleAnalyzerPlugin()
    ]
})

module.exports = cfg