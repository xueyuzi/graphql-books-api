const {
    ApolloServer,
    gql
} = require("apollo-server");
const BooksApi = require("./api/book");
const mysql = require("./api/mysql");
const resolvers = require("./resolvers");
const { importSchema } = require('graphql-import');
const { makeExecutableSchema } = require('graphql-tools');
const typeDefs = importSchema('schema.graphql'); 
const schema = makeExecutableSchema({ typeDefs, resolvers });
const server = new ApolloServer({
    schema,
    dataSources: () => ({
        booksApi: new BooksApi(),
        mysql
    }),
    context: async ({ req }) => {
        const token = req.headers.authorization || '';
        const user = (await mysql.getStudentByToken(token))[0];
        return { user };
      },
});
server.listen({
    port: 4000,
    host: "0.0.0.0"}).then(({url}) => {
    console.log(`🚀 Server ready at ${url}`)
})