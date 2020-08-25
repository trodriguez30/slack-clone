import {
  QuestionCircleOutlined,
  SlackOutlined,
  UserOutlined,
  LockOutlined,
  MailOutlined
} from "@ant-design/icons";
import { Form, Input, Tooltip, Row, Col, Button, message } from "antd";
import md5 from "md5";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import firebase from "../../lib/firebase";

export default function Register() {
  const history = useHistory();
  const usersRef = firebase.database().ref("users");
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(false);
  const [createdUser, setCreatedUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState(null);

  useEffect(() => {
    if (values && createdUser) {
      updateUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values, createdUser]);

  useEffect(() => {
    if (updatedUser) {
      saveUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedUser]);

  const onFinish = values => {
    setLoading(true);
    createUser(values);
  };

  const createUser = async values => {
    try {
      let createdUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(values.email, values.password);
      setValues(values);
      setCreatedUser(createdUser);
    } catch (err) {
      message.error(err.message);
      setLoading(false);
    }
  };

  const updateUser = async () => {
    try {
      await createdUser.user.updateProfile({
        displayName: values.nickname,
        photoURL: `https://gravatar.com/avatar/${md5(
          createdUser.user.email
        )}?d=identicon`
      });
      setUpdatedUser(true);
    } catch (err) {
      message.error(err.message);
      setLoading(false);
    }
  };

  const saveUser = () => {
    try {
      usersRef.child(createdUser.user.uid).set({
        name: createdUser.user.displayName,
        avatar: createdUser.user.photoURL
      });
      message.success("User created successfully! Please LogIn");
      setLoading(false);
      history.push("/login");
    } catch (err) {
      message.error("Try again please!");
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

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!"
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      "The two passwords that you entered do not match!"
                    );
                  }
                })
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="eg. &bull;&bull;&bull;&bull;&bull;&bull;"
              />
            </Form.Item>

            <Form.Item
              name="nickname"
              label={
                <span>
                  Nickname&nbsp;
                  <Tooltip title="What do you want others to call you?">
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Please input your nickname!",
                  whitespace: true
                }
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="eg. trod30"
              />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button loading={loading} type="primary" htmlType="submit" block>
                Register
              </Button>
              Already a user? <Link to="/login">Login!</Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}
