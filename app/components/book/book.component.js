import template from './book.html';
import controller from './book.controller';

const component = {
    replace: true,
    bindings: {
        book: '<',
        id: '<'
    },
    controller,
    template
};

export default component;
