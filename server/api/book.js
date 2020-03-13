const {
    RESTDataSource
} = require("apollo-datasource-rest");

module.exports =  class BooksApi extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = "https://douban.uieee.com/v2/book";
    }

    async searchBooks(search) {
        return this.get(`/search?q=${search}`).then(v=>v.books);
    }
}