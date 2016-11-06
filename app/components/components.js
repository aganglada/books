import angular from 'angular';

import siteHeader from './site-header/site-header';
import book from './book/book';
import loadingPlaceholder from './loading-placeholder/loading-placeholder';
import pagination from './pagination/pagination';

export default angular.module('app.components', [
    siteHeader.name,
    book.name,
    loadingPlaceholder.name,
    pagination.name
]);
