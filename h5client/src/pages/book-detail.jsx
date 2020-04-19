import React from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_BOOK } from "../../gql/books.gql";
import { ADD_CART } from "../../gql/cart.gql";
import { NavBar, Icon, Card, Button, Toast } from "antd-mobile";
export default () => {
  const match = useRouteMatch();
  const { params } = match;
  const history = useHistory();
  const [addcart] = useMutation(ADD_CART, {
    onError: function (e) {
      Toast.show(e.graphQLErrors[0].message);
    },
    onCompleted: function (e) {
      Toast.show("借阅成功");
    },
  });
  const { loading, data } = useQuery(GET_BOOK, {
    variables: { id: params.id },
  });

  return (
    <div>
      <NavBar
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => history.goBack()}
      >
        图书详情
      </NavBar>
      {data && data.book && (
        <div>
          <Card>
            <Card.Body>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img width="150" src={data.book.image} alt="图书封面" />
              </div>
            </Card.Body>
          </Card>
          <div style={{ margin: "20px", lineHeight: "1.5" }}>
            <h3>图书描述</h3>
            <div>{data.book.summary}</div>
          </div>
          <Button
            type="primary"
            onClick={() => {
              addcart({
                variables: {
                  book: {
                    studentNo: Number(localStorage.getItem("studentNo")),
                    bookId: Number(data.book.id),
                    bookName: data.book.title,
                  },
                },
              });
            }}
          >
            借书
          </Button>
        </div>
      )}
    </div>
  );
};
