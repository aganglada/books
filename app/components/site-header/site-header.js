import angular from 'angular';

import siteHeaderComponent from './site-header.component';

const siteHeaderModule = angular.module('app.component.siteHeader', [])
    .component('cSiteHeader', siteHeaderComponent);

export default siteHeaderModule;
