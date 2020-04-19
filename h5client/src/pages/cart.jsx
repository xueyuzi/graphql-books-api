import React, { useEffect } from "react";
import { List, Card, Button } from "antd-mobile";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import { GET_CARTLIST } from "../../gql/cart.gql";
import { useHistory, useLocation } from "react-router-dom";
export default () => {
  const { data } = useQuery(GET_CARTLIST);
  const location = useLocation();
  // useEffect(() => {
  //   getCartList();
  //   console.log("hisotry");
  // }, [location]);
  console.log(data);
  return (
    <List>
      {data &&
        data.cartList.map((cart) => {
          let createTime = new Date(Number(cart.createTime));
          let returnTime = new Date(
            Number(cart.createTime) + 30 * 24 * 60 * 60 * 1000
          );
          let countDown = Math.ceil(
            (returnTime - Date.now()) / (24 * 60 * 60 * 1000)
          );

          return (
            <Card full>
              <Card.Header title={cart.bookName} />
              <Card.Body>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <p>借书日期： {createTime.toLocaleDateString()}</p>
                    <p>
                      还书日期： {returnTime.toLocaleDateString()}{" "}
                      {countDown < 0 ? (
                        <span style={{ color: "red" }}>
                          {"逾期" + Math.abs(countDown)}
                        </span>
                      ) : (
                        "还有" + countDown
                      )}
                      天
                    </p>
                  </div>
                  <div>
                    <Button
                      style={{ width: "100px", height: "50px" }}
                      type="warning"
                    >
                      {" "}
                      还书{" "}
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          );
        })}
    </List>
  );
};
