import angular from 'angular';

import immutableService from './immutable.service';

const immutableModule = angular.module('app.service.immutable', [])
    .service('immutable', immutableService);

export default immutableModule;
