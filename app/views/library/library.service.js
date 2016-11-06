import angular from 'angular';

const limit = 10;
const total = 100;
const page = 1;

function libraryService(
    api
) {
    function init(context) {
        context.books = new Array(limit);
        context.pagination = {
            limit,
            total,
            page,
            pages: total / limit
        };
        context.params = {
            _page: context.pagination.page
        };
    }

    function requestBooks(context) {
        return api.load('/book', { params: context.params })
            .then(({ data }) => context.books = data);
    }

    function onPaginate(page) {
        this.pagination = Object.assign(this.pagination, {
            page
        });

        this.params = Object.assign(this.params, {
            _page: page
        });

        requestBooks(this).then(() => {
            window.scrollTo(0, 0);
        });
    }

    return {
        init,
        requestBooks,
        onPaginate
    };
}

export default angular.module('app.view.library.service', [])
    .service('libraryService', libraryService);
