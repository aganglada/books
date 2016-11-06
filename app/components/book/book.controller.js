class Book {
    constructor(
        bookService
    ) {
        this.bookService = bookService;
    }

    $doCheck() {
        this.bookService.formatPublishedDate(this);
    }
}

export default Book;