'use strict';

module.exports = function (test, production) {
    var devTool = production ? 'source-map' : 'eval';

    // @see: https://github.com/karma-runner/karma/issues/2024
    return test ? 'inline-source-map' : devTool;
};
