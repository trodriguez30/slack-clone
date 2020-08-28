import React, { useState } from "react";
import { Layout } from "antd";
import UserPanel from "./UserPanel";
import "./sidePanel.css";

const { Sider } = Layout;

function SidePanel() {
  const [broken, setBroken] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      className="sider"
      breakpoint="lg"
      collapsedWidth="80"
      onBreakpoint={broken => {
        setBroken(broken);
      }}
      onCollapse={(collapsed, type) => {
        setCollapsed(collapsed);
      }}
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <UserPanel broken={broken} />
    </Sider>
  );
}
export default SidePanel;
