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
        summary:String
        cover_url:String
        rating:String
        tags:[String]
        pubdate:String
        subtitle:String
        catalog:String
        
    }
    
    type Query{
        books(query:String!):[Book]
    }
`;

const resolvers = {
    Query: {
        books: (_, {
            query
        }, {
            dataSources
        }) => {
            return dataSources.booksApi.searchBooks(query).then(res => {
                console.log("res")
                if (res) {
                    return res.map(book => {
                        let data = {
                            ...book
                        };
                        data.rating = book.rating.average
                        data.tags = book.tags.map(tag=>tag.title)
                        return data
                    })
                }
            })


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