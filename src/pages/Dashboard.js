import { Layout, Menu, Breadcrumb } from "antd";
import {} from "@ant-design/icons";

import React from "react";

import Header from "../components/Header/Header";
import SidePanel from "../components/SidePanel/SidePanel";
import Messages from "../components/Messages/Messages";
import MetaPanel from "../components/MetaPanel/MetaPanel";

import "./Dash.css";

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

function Dash() {
  return (
    <Layout>
      <SidePanel />
      <Layout>
        <Header />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            content
          </div>
        </Content>
        {/* <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
  );
}

export default Dash;
