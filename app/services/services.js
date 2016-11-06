import angular from 'angular';

import api from './api/api';
import constants from './constants/constants';
import immutable from './immutable/immutable';
import store from './store/store';

export default angular.module('app.services', [
    api.name,
    constants.name,
    immutable.name,
    store.name
]);
