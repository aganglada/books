import angular from 'angular';
import apiService from './api.service';

const apiModule = angular.module('app.service.api', [])
    .service('api', apiService);

export default apiModule;
