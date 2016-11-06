import angular from 'angular';

import storeService from './store.service';

const storeModule = angular.module('app.service.store', [])
    .service('store', storeService);

export default storeModule;
