import angular from 'angular';
import uiRouter from 'angular-ui-router';

import appComponent from './app.component';
import appConfig from './app.config';
import appRun from './app.run';
import components from './components/components';
import services from './services/services';
import views from './views/views';

angular.module('app', [
    uiRouter,
    components.name,
    services.name,
    views.name
])
    .component('cApp', appComponent)
    .config(appConfig)
    .run(appRun);

angular.bootstrap(document.getElementById('app-bootstrap'), ['app']);
