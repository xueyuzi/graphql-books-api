import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import BOOKS from "../../gql/books.gql";
import { useLazyQuery } from "@apollo/react-hooks";
import { Button, Input, Card, Row } from "antd";
function App() {
  const [query, setQuery] = useState();
  const [getBooks, { loading, data }] = useLazyQuery(BOOKS);
  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(data);
  return (
    <div className="App">
      <Row >
        <Input
          placeholder="书名"
          value={query}
          onChange={e => {
            setQuery(e.target.value);
          }}
        />
        <Button onClick={() => getBooks({ variables: { query } })}>
          search
        </Button>
      </Row>
      {data && data.books && data.books.map(book => <div>{book.title}</div>)}
    </div>
  );
}

export default App;
