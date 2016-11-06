import template from './pagination.html';

const component = {
    bindings: {
        page: '<',
        pages: '<',
        onPaginate: '='
    },
    template
};

export default component;
