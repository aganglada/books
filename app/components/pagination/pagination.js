import angular from 'angular';

import component from './pagination.component';
import filter from './pagination.filter';

const module = angular.module('app.component.pagination', [])
    .component('cPagination', component)
    .filter('range', filter);

export default module;
