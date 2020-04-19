import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter as Router } from "react-router-dom";
import { gql } from "apollo-boost";
import { ApolloClient } from "apollo-client";
import { InMemoryCache, defaultDataIdFromObject } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { GET_QUERY } from "../gql/books.gql";

const cache = new InMemoryCache({
  dataIdFromObject: (object) => {
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
        getCacheKey({ __typename: "Book", id: args.id }),
    },
  },
});

const httpLink = createHttpLink({
  uri: "http://gql.xueyuzi.com:4000",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    },
  };
});
const client = new ApolloClient({
  // uri: "http://localhost:4000",
  link: authLink.concat(httpLink),
  cache,
  typeDefs: gql`
    extend type Query {
      search: String
      isLoggedIn: Boolean!
    }
  `,
  resolvers: {},
});
cache.writeData({
  data: {
    search: "芥川龙之介",
    isLoggedIn: !!localStorage.getItem("token"),
  },
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
