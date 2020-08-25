import React from "react";
import { SlackOutlined } from "@ant-design/icons";
import "./styles.css";

export default function Loader() {
  return (
    <div className="loader-container">
      <div className="loader">
        <SlackOutlined style={{ fontSize: 200 }} />
      </div>
    </div>
  );
}
