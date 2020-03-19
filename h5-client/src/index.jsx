import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter as Router } from "react-router-dom";
import ApolloClient,{gql} from "apollo-boost";
import { InMemoryCache, defaultDataIdFromObject } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import {GET_QUERY} from "../../gql/books.gql"

const cache = new InMemoryCache({
  dataIdFromObject: object => {
    switch (object.__typename) {
      case "Book":
        console.log(object);
        return object.id; // use the `key` field as the identifier
      default:
        return defaultDataIdFromObject(object); // fall back to default handling
    }
  },
  cacheRedirects: {
    Query: {
      book: (_, args, { getCacheKey }) =>
        getCacheKey({ __typename: "Book", id: args.id })
    }
  }
});
const client = new ApolloClient({
  uri: "http://gql.xueyuzi.com:4000",
  link: new HttpLink(),
  cache,
  typeDefs:gql`
  extend type Query {
    search: String
  }
`,
  resolvers:{}
});
cache.writeData({
  data: {
    search: "三国志"
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
