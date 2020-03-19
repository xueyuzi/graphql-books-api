const {
    RESTDataSource
} = require("apollo-datasource-rest");

module.exports = class BooksApi extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = "https://douban.uieee.com/v2/book";
        // this.baseURL = "https://douban-api-git-master.zce.now.sh";
    }

    async searchBooks(search) {
        return this.get(`/search?q=${search}`).then(v => v.books);
    }

    async getBook(id) {
        return this.get(`/${id}`)
    }
}