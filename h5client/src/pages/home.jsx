import React, { useEffect, useState } from "react";
import { SearchBar, Card, Tag } from "antd-mobile";
import { GET_BOOK_LIST, GET_QUERY } from "../../gql/books.gql";
import { useLazyQuery, useQuery, useApolloClient } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import  axios  from "axios";
export default () => {
  // const [getBooks, { loading, data }] = useLazyQuery(GET_BOOK_LIST);
  // const { data:queryData } = useQuery(GET_QUERY);
  const [data, setData] = useState({}); // 页面数据setData更新数据
  const [search, setSearch] = useState("书名");
  // const { search } = queryData;
  const client = useApolloClient();
  const getBooks = (search) => {
    // search关键字
    // 获取书本信息的方法
    axios
      .get("http://localhost:8080/book/select?search=" + search, {
        headers: { "admin-token": localStorage.getItem("token") },
      })
      .then((res) => {
        setData(res.data);
      });
  };
  useEffect(() => {
    getBooks(search);
  }, [search]);
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div>
      <SearchBar
        placeholder={search + " (只显示20条搜索结果)"}
        maxLength={8}
        onSubmit={(v) => setSearch(v)}
      />
      {data &&
        data.books &&
        data.books.map((book) => (
          <Link to={`/home/book/${book.id}`}>
            <Card full>
              <Card.Header title={book.title} extra={book.author} />
              <Card.Body>
                {book.tags ? (
                  book.tags.map((tag) => <Tag small>{tag}</Tag>)
                ) : (
                  <></>
                )}
              </Card.Body>
            </Card>
          </Link>
        ))}
    </div>
  );
};
