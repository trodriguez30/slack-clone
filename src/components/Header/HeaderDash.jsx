import { Layout } from "antd";

import React from "react";

import UserSession from "./UserSession";

import "./HeaderDash.css";

const { Header, Content, Sider } = Layout;

function HeaderDash() {
  return (
    <Header className="header" style={{ padding: 0 }}>
      <UserSession />
    </Header>
  );
}
export default HeaderDash;
