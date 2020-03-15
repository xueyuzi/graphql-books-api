const {
    ApolloServer,
    gql
} = require("apollo-server");
const BooksApi = require("./api/book");

const typeDefs = gql`
    type Book @cacheControl(maxAge: 1000){
        id:ID!
        title:String
        publisher:String
        author_intro:String
        author:String
        summary:String
        image:String
        rating:String
        tags:[String]
        pubdate:String
        subtitle:String
        catalog:String
        series:String
    }
    
    type Query{
        books(query:String!):[Book]
        book(id:String!):Book
    }
`;
const _transResToBook = (res) => {
    let data = {
        ...res
    };
    data.rating = res.rating.average
    data.tags = res.tags.map(tag => tag.title)
    data.author = res.author ? res.author[0] : "无名氏"
    data.series = res.series ? res.series.title : "无系列"
    return data
}

const resolvers = {
    Query: {
        books: (_, {
            query
        }, {
            dataSources
        }) => {
            return dataSources.booksApi.searchBooks(query).then(res => {
                if (!res) {
                    return []
                }
                console.log("search Books")
                return res.map(book => _transResToBook(book))
            })
        },
        book: (_, {
            id
        }, {
            dataSources
        }) => {
            console.log("get Book")
            return dataSources.booksApi.getBook(id).then(_transResToBook)
        }
    },
}
const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        booksApi: new BooksApi()
    })
});
server.listen({
    port: 4000,
    host: "0.0.0.0"
}).then(({
    url
}) => {
    console.log(`🚀 Server ready at ${url}`)
})