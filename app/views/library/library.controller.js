export default class Library {
    constructor(
        libraryService
    ) {
        this.libraryService = libraryService;
        this.onPaginate = this.libraryService.onPaginate.bind(this);
    }

    $onInit() {
        this.libraryService.init(this);
        this.libraryService.requestBooks(this);
    }
}
