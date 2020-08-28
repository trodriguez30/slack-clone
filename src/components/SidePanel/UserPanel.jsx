import React from "react";
import { SlackOutlined } from "@ant-design/icons";
import "./sidePanel.css";

function UserPanel({ broken }) {
  console.log(broken);
  return (
    <div className="userPanelContainer">
      {!broken && <p className="chatName">SlackClone</p>}
      <SlackOutlined style={{ color: "white", fontSize: "30px" }} />
    </div>
  );
}
export default UserPanel;
