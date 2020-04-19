import React, { useState } from "react";
import { LOGIN, GET_LOGIN_STATUS } from "../../gql/login.gql";
import { useMutation, useApolloClient, useQuery } from "@apollo/react-hooks";
import { ApolloConsumer } from "@apollo/react-components";
import { validate } from "graphql";
import { InputItem, Button, WhiteSpace } from "antd-mobile";
export default (props) => {
  const client = useApolloClient();
  const [message, setMessage] = useState();
  const [studentNo, setStudentNo] = useState();
  const [password, setPassword] = useState();
  const [login, { data }] = useMutation(LOGIN, {
    onCompleted: function (data) {
      if (data && data.login) {
        localStorage.setItem("token", data.login.token);
        localStorage.setItem("studentName", data.login.studentName);
        localStorage.setItem("studentNo", data.login.studentNo);
        props.setIsLoggedIn(true);
        props.setStudentName(data.login.studentName);
      }
    },
    onError: function (err) {
      setMessage(err.graphQLErrors[0].message);
    },
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div style={{ width: "100%" }}>
        <WhiteSpace size="xl" />
        <h1 style={{textAlign:"center"}}>学生登陆</h1>
        <WhiteSpace size="xl" />
        <InputItem
          clear
          placeholder="10086"
          onChange={(v) => setStudentNo(Number(v))}
          type="money"
          moneyKeyboardAlign="left"
          disabledKeys={["."]}
        >
          学号
        </InputItem>
        <WhiteSpace />
        <InputItem
          clear
          placeholder="admin123"
          onChange={setPassword}
          type="password"
        >
          密码
        </InputItem>
        <WhiteSpace size="xl" />
        <WhiteSpace size="xl" />
        <h2 style={{ opacity: message ? 1 : 0, color: "red" }}>
          {message ? message : "错误提示"}
        </h2>
        <Button
          type="primary"
          onClick={() => {
            login({
              variables: {
                student: { studentNo, password },
              },
            });
          }}
        >
          登陆
        </Button>
      </div>
    </div>
  );
};
