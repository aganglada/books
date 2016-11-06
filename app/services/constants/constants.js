import angular from 'angular';

import constantsService from './constants.service';

const constantsModule = angular.module('app.service.constants', [])
    .service('constants', constantsService);

export default constantsModule;
