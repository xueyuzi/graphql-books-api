const {
    ApolloServer,
    gql
} = require("apollo-server");
const BooksApi = require("./api/book");

const typeDefs = gql`
    type Book{
        title:String
        id:Int
        cover_url:String
    }
    type Query{
        books(query:String!):[Book]
    }
`;

const resolvers = {
    Query: {
        books: (_,{query},{dataSources}) => dataSources.booksApi.searchBooks(query)
    },
}
const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources:()=>({
        booksApi:new BooksApi()
    })
});
server.listen({port:80}).then(({
    url
}) => {
    console.log(`🚀 Server ready at ${url}`)
})