export default class Book {
    constructor(
        bookService
    ) {
        this.bookService = bookService;
    }

    $onInit() {
        this.bookService.init(this);
        this.bookService.requestBook(this);
    }

    $doCheck() {
        this.bookService.formatPublishedDate(this);
    }
}
