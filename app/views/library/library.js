import angular from 'angular';
import uiRouter from 'angular-ui-router';

import component from './library.component';
import service from './library.service';

const module = angular.module('app.view.library', [
    uiRouter, service.name
])
    .config(($stateProvider, constantsProvider) => {
        const constants = constantsProvider
            .$get()
            .getByKey;

        $stateProvider
            .state(constants('STATE::LIBRARY'), {
                url: constants('URL::LIBRARY'),
                template: '<v-library></v-library>',
                title: 'Library'
            });
    })
    .component('vLibrary', component);

export default module;
