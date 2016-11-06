import angular from 'angular';

import component from './book.component';

const module = angular.module('app.component.book', [])
    .component('cBook', component);

export default module;
