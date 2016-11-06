import angular from 'angular';
import moment from 'moment';

function bookService(
    $stateParams,
    api
) {
    function init(context) {
        context.book = {};
    }

    function requestBook(context) {
        return api.load(`/book/${$stateParams.id}`).then(({ data }) => context.book = data);
    }

    function likeBook(context) {
        context.book = Object.assign(context.book, {
            liked: !context.book.liked,
            likes: context.book.liked ? context.book.likes - 1 : context.book.likes + 1
        });
    }

    function formatPublishedDate(context) {
        if (!context.book) {
            return false;
        }

        if (!moment(context.book.published).isValid()) {
            return false;
        }

        context.book = Object.assign({}, context.book, {
            published: moment(context.book.published).fromNow()
        });
    }

    return {
        init,
        requestBook,
        likeBook,
        formatPublishedDate
    };
}

export default angular.module('app.view.book.service', [])
    .service('bookService', bookService);
