'use strict';

var devtool = require('./devtool.js');
var entry = require('./entry.js');
var output = require('./output.js');
var loaders = require('./loaders.js');
var plugins = require('./plugins.js');

/**
 * Environment type
 * production is for generating minified builds
 * test is for generating test builds
 */
var env = process.env.NODE_ENV;
var live = env === 'live';
var production = env === 'production' || live;
var test = /test/.test(env);

console.log('The current NODE_ENV is', env);

/**
 * Config
 * Reference: http://webpack.github.io/docs/configuration.html
 * This is the object where all configuration gets set
 */
module.exports = {
    /**
     * Entry
     * Should be an empty object if it's generating a test build
     * Karma will set this when it's a test build
     * @see http://webpack.github.io/docs/configuration.html#entry
     */
    entry: entry(test),
    /**
     * Output
     * Should be an empty object if it's generating a test build
     * Karma will handle setting it up for you when it's a test build
     * @see http://webpack.github.io/docs/configuration.html#output
     */
    output: output(test, production),
    /**
     * Resolve
     * Options affecting the resolving of modules
     * @see https://webpack.github.io/docs/configuration.html#resolve
     */
    resolve: {
        alias: {
            components: process.cwd() + '/app/components',
            directives: process.cwd() + '/app/directives',
            services: process.cwd() + '/app/services',
            views: process.cwd() + '/app/views'
        }
    },

    cache: true,
    debug: false,
    noParse: test ? [] : [
        process.cwd() + '/node_modules/angular/angular.min.js',
        process.cwd() + '/node_modules/angular-ui-router/build/angular-ui-router.min.js'
    ],

    /**
     * Devtool
     * Type of sourcemap to use per build type
     * @see http://webpack.github.io/docs/configuration.html#devtool
     */
    devtool: devtool(test, production),
    /**
     * Loaders
     * This handles most of the magic responsible for converting modules
     * @see http://webpack.github.io/docs/list-of-loaders.html
     * @see http://webpack.github.io/docs/configuration.html#module-loaders
     */
    module: {
        loaders: loaders(test, production)
    },
    /**
     * Plugins
     * @see http://webpack.github.io/docs/configuration.html#plugins
     * @see http://webpack.github.io/docs/list-of-plugins.html
     */
    plugins: plugins(test, production, live),
    /**
     * Dev server configuration
     * @see http://webpack.github.io/docs/configuration.html#devserver
     * @see http://webpack.github.io/docs/webpack-dev-server.html
     */
    devServer: {
        contentBase: './',
        host: '0.0.0.0',
        proxy: {
            '/api/*': {
                target: 'http://localhost:3001',
                secure: false
            }
        },
        stats: {
            modules: false,
            cached: false,
            colors: false,
            chunk: false
        }
    },
    /**
     * Store/Load compiler state from/to a json file. This will result in persistent ids of modules and chunks.
     * @see https://webpack.github.io/docs/configuration.html#recordspath-recordsinputpath-recordsoutputpath
     */
    recordsPath: process.cwd() + '/webpack/cache.json'
};

