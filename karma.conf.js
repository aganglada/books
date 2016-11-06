var webpackConfig = require('./webpack.config.js');
var env = process.env.NODE_ENV;
var coverageConfig = {
    dir: 'coverage/'
};

if (env === 'test-lcov') {
    coverageConfig.subdir = 'lcov/';
    coverageConfig.type = 'lcovonly';
} else {
    coverageConfig.subdir = 'html/';
    coverageConfig.type = 'html';
}

/**
 * @see http://karma-runner.github.io/0.12/config/configuration-file.html
 */
module.exports = function karmaConfig (config) {
    config.set({
        browsers: ['PhantomJS'],
        coverageReporter: coverageConfig,
        files: [
            'node_modules/phantomjs-polyfill/bind-polyfill.js',
            'webpack/spec.js'
        ],
        frameworks: [
            /**
             * Set framework to jasmine
             * @see https://github.com/karma-runner/karma-jasmine
             */
            'jasmine'
        ],
        logLevel: config.LOG_ERROR,
        port: 9876,
        preprocessors: {
            /**
             * Convert files with webpack and load sourcemaps
             * @see http://webpack.github.io/docs/testing.html
             * @see https://github.com/webpack/karma-webpack
             */
            'webpack/spec.js': ['webpack', 'sourcemap'],
            'app/**/!(*.spec).js': 'coverage'
        },
        reporters: [
            'dots',
            /**
             * Output code coverage files
             * @see https://github.com/karma-runner/karma-coverage
             */
            'coverage'
        ],
        singleRun: true,
        webpack: webpackConfig,
        webpackServer: {
            noInfo: true
        }
    });
};
