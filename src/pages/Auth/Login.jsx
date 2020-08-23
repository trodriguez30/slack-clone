import {
  SlackOutlined,
  LockOutlined,
  MailOutlined
} from "@ant-design/icons";
import { Form, Input, Row, Col, Button, message } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { Link, useHistory } from "react-router-dom";
import actions from "../../redux/auth/actions";
import firebase from "../../firebase";

const { userLogin } = actions;

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [loginUser, setLoginUser] = useState(null);

  useEffect(() => {
    if (loginUser) {
      message.success("Login Successfully!");
      setLoading(false);
      const { displayName, email, phoneNumber, photoURL, uid } = loginUser.user;
      const userInfo = {
        displayName,
        email,
        phoneNumber,
        photoURL
      };
      dispatch(userLogin({ userInfo, uid }));
      history.push("/");
    }
  }, [loginUser]);

  const onFinish = values => {
    setLoading(true);
    logIn(values);
  };

  const logIn = async values => {
    try {
      let loggedUser = await firebase
        .auth()
        .signInWithEmailAndPassword(values.email, values.password);
      setLoginUser(loggedUser);
    } catch (err) {
      message.error(err.message);
      setLoading(false);
    }
  };

  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 }
  };
  const tailLayout = {
    wrapperCol: { xs: { span: 24, offset: 0 }, sm: { offset: 0, span: 24 } }
  };

  return (
    <>
      <Row
        type="flex"
        justify="center"
        align="bottom"
        style={{
          minHeight: "20vh",
          minWidth: "100vw"
        }}
      >
        <SlackOutlined style={{ fontSize: "14vh" }} />
      </Row>
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{
          minHeight: "80vh",
          minWidth: "100vw"
        }}
      >
        <Col
          xl={{ span: 8, offset: 0 }}
          lg={{ span: 12, offset: 0 }}
          md={{ span: 16, offset: 0 }}
          xs={{ span: 20, offset: 0 }}
        >
          <Form {...layout} form={form} name="register" onFinish={onFinish}>
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!"
                },
                {
                  required: true,
                  message: "Please input your E-mail!"
                }
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="eg. trodr@xyz.com"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!"
                }
              ]}
              hasFeedback
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="eg. &bull;&bull;&bull;&bull;&bull;&bull;"
              />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button loading={loading} type="primary" htmlType="submit" block>
                Log In
              </Button>
              Don't have an account?<Link to="/login">Sign up</Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}
