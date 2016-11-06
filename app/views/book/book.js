import angular from 'angular';
import uiRouter from 'angular-ui-router';

import component from './book.component';
import service from './book.service';

const module = angular.module('app.view.book', [
    uiRouter, service.name
])
    .config(($stateProvider, constantsProvider) => {
        const constants = constantsProvider
            .$get()
            .getByKey;

        $stateProvider
            .state(constants('STATE::BOOK'), {
                url: constants('URL::BOOK'),
                template: '<v-book></v-book>',
                title: 'Book'
            });
    })
    .component('vBook', component);

export default module;
