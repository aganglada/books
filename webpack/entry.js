'use strict';

module.exports = function (test) {
    var obj = {
        style: './.tmp/app.css',
        app: './app/app.js',
        vendors: ['angular', 'angular-ui-router']
    };

    return test ? {} : obj;
};
