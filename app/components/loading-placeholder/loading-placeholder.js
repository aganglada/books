import angular from 'angular';

import component from './loading-placeholder.component';

const module = angular.module('app.component.loadingPlaceholder', [])
    .component('cLoadingPlaceholder', component);

export default module;
