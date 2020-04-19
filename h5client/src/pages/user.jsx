import React, { useState } from "react";
import Login from "./login";
import { List, Button, WhiteSpace } from "antd-mobile";
export default () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [studentName, setStudentName] = useState(
    localStorage.getItem("studentName")
  );
  return (
    <>
      {!isLoggedIn ? (
        <Login setIsLoggedIn={setIsLoggedIn} setStudentName={setStudentName} />
      ) : (
        <div>
          <WhiteSpace size="xl" />
          {/* <List renderHeader={() =>}> */}
          {/* <List.Item> */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                borderRadius: "50%",
                height: "100px",
                width: "100px",
                border: "1px solid",
              }}
            ></div>
            <h1>{studentName}</h1>
          </div>
          <List>
              <List.Item>我的借书记录</List.Item>
              <List.Item>我的班级</List.Item>
          </List>
          <WhiteSpace size="xl"/>
          <Button
            type="warning"
            onClick={() => {
              setIsLoggedIn(false);
              localStorage.removeItem("token");
              localStorage.removeItem("studentName");
              localStorage.removeItem("studentNo");
            }}
            inLine
          >
            登出
          </Button>
          {/* </List.Item> */}
          {/* </List> */}
        </div>
      )}
    </>
  );
};
