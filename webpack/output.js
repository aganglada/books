'use strict';

module.exports = function (test, production) {
    var obj = {
        // Absolute output directory
        path: process.cwd() + '/web/assets',
        // Output path from the view of the page
        // Uses webpack-dev-server in development
        publicPath: production ? '/assets' : 'http://localhost:8080/',
        // Filename for entry points
        // Only adds hash in production mode
        filename: production ? '[name].[chunkhash].js' : '[name].bundle.js',
        // Filename for non-entry points
        // Only adds hash in production mode
        chunkFilename: production ? '[name].[chunkhash].js' : '[name].bundle.js'
    };

    return test ? {} : obj;
};

