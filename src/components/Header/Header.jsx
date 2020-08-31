import { Layout } from "antd";

import React from "react";

import UserSession from "./UserSession";

import "./Header.css";

const HeaderAnt = Layout.Header;

function Header() {
  return (
    <HeaderAnt className="header" style={{ padding: 0 }}>
      <UserSession />
    </HeaderAnt>
  );
}
export default Header;
