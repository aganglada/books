import angular from 'angular';

import library from './library/library';
import book from './book/book';

export default angular.module('app.views', [
    library.name,
    book.name
]);
