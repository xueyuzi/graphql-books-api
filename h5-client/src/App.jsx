import React, { useState, useEffect } from "react";

import { TabBar } from "antd-mobile";
import { useHistory, useLocation, Route } from "react-router-dom";
import HomePage from "./pages/home";
import BookPage from "./pages/book-detail";
import CartPage from "./pages/cart";
import UserPage from "./pages/user";
function App() {
  const location = useLocation();
  const history = useHistory();
  return (
    <div
      className="App"
      style={{ position: "fixed", height: "100%", width: "100%", top: 0 }}
    >
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
      >
        <TabBar.Item
          title="书库"
          key="home"
          icon={<i className="iconfont">&#xe7c6;</i>}
          selectedIcon={<i className="iconfont selected">&#xe7c6;</i>}
          selected={location.pathname.match("home")}
          onPress={() => history.replace("/home")}
        >
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/home/book/:id" component={BookPage} />
        </TabBar.Item>
        <TabBar.Item
          title="借/还书"
          key="cart"
          selected={location.pathname.match("cart")}
          icon={<i className="iconfont">&#xe7b3;</i>}
          selectedIcon={<i className="iconfont selected">&#xe7b3;</i>}
          onPress={() => history.replace("/cart")}
        >
          <CartPage />
        </TabBar.Item>
        <TabBar.Item
          title="我的"
          key="user"
          selected={location.pathname.match("user")}
          icon={<i className="iconfont">&#xe7ae;</i>}
          selectedIcon={<i className="iconfont selected">&#xe7ae;</i>}
          onPress={() => history.replace("/user")}
        >
          <UserPage />
        </TabBar.Item>
      </TabBar>
    </div>
  );
}

export default App;
