import { Dropdown, Avatar, Menu } from "antd";
import { HomeFilled } from "@ant-design/icons";
import actions from "../../redux/auth/actions";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const { userLogout } = actions;

function UserSession() {
  const dispatch = useDispatch();
  const history = useHistory();
  const photoURL = useSelector(state => state.Auth.info.photoURL);
  const displayName = useSelector(state => state.Auth.info.displayName);

  const onLogout = (e) => {
    e.preventDefault();
    dispatch(userLogout());
    history.push("/");
  };
  const menu = (
    <Menu>
      <Menu.Item>
        <a href="# " className="optionLink" onClick={onLogout}>
          LogOut
        </a>
      </Menu.Item>
    </Menu>
  );

  if (photoURL) {
    return (
      <Dropdown overlay={menu} placement="bottomRight" arrow>
        <Avatar src={photoURL} />
      </Dropdown>
    );
  }

  return (
    <Avatar style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
      {displayName[0]}
    </Avatar>
  );
}

export default UserSession;
