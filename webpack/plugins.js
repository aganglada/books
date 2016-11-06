'use strict';

var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
var NgAnnotatePlugin = require('ng-annotate-webpack-plugin');
var webpack = require('webpack');

module.exports = function (test, production) {

    var htmlMinify = {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        collapseBooleanAttributes: true
    };

    /**
     * Generating asset manifests
     * @see https://www.npmjs.com/package/webpack-manifest-plugin
     * @see https://medium.com/@okonetchnikov/long-term-caching-of-static-assets-with-webpack-1ecb139adb95
     */
    var manifest = production ? new ManifestPlugin({
        fileName: '../webpack.manifest.json'
    }) : null;

    /**
     * Allows exporting a manifest that maps entry chunk names to their output files
     * @see https://github.com/diurnalist/chunk-manifest-webpack-plugin
     * @see https://medium.com/@okonetchnikov/long-term-caching-of-static-assets-with-webpack-1ecb139adb95
     */
    var chunkManifest = production ? new ChunkManifestPlugin({
        filename: '../webpack.chunk-manifest.json',
        manifestVariable: 'webpackManifest'
    }) : null;

    /**
     * Assign the module and chunk ids by occurrence count.
     * @type {webpack.optimize.OccurenceOrderPlugin}
     * @see http://webpack.github.io/docs/list-of-plugins.html#occurenceorderplugin
     */
    var occurenceOrderPlugin = production ? new webpack.optimize.OccurenceOrderPlugin() : null;

    /**
     * Render index.html
     * Skip rendering index.html in test mode
     * @see https://github.com/ampedandwired/html-webpack-plugin
     */
    var indexHtml = test ? null : new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './app/index.html',
        inject: 'body',
        env: production ? 'production' : 'dev',
        minify: production ? htmlMinify : null
    });

    /**
     * Split app and vendor code
     * Splits the app into two files
     * @see https://webpack.github.io/docs/code-splitting.html#split-app-and-vendor-code
     */
    var vendors = test ? null : new webpack.optimize.CommonsChunkPlugin(
        'vendors',
        production ? '[name].[chunkhash].js' : '[name].bundle.js'
    );

    /**
     * Runs ng-annotate on your bundles
     * @see https://github.com/jeffling/ngmin-webpack-plugin
     */
    var ngAnnotatePlugin = new NgAnnotatePlugin({add: true});

    /**
     * Only emit files when there are no errors
     * @see http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
     */
    var noErrorsPlugin = production ? new webpack.NoErrorsPlugin() : null;

    /**
     * Dedupe modules in the output
     * @see http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
     */
    var dedupePlugin = production ? new webpack.optimize.DedupePlugin() : null;

    /**
     * Minify all javascript, switch loaders to minimizing mode
     * @see http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
     */
    var uglifyJsPlugin = production ? new webpack.optimize.UglifyJsPlugin({
            mangle: false
        }) : null;

    /**
     * @see https://webpack.github.io/docs/stylesheets.html#styles-from-initial-chunks-into-separate-css-output-file
     */
    var cssExtractTextPlugin = production ?
        new ExtractTextPlugin('[name].[chunkhash].css') : null;

    return [
        chunkManifest,
        cssExtractTextPlugin,
        dedupePlugin,
        indexHtml,
        manifest,
        vendors,
        ngAnnotatePlugin,
        noErrorsPlugin,
        occurenceOrderPlugin,
        uglifyJsPlugin
    ].filter(function (item) {
        return item !== null;
    });
};

