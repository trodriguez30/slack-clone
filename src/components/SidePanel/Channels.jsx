import React, { useState } from "react";
import { Menu, Modal, Form, Input, Button } from "antd";
import { AppstoreOutlined, PlusOutlined } from "@ant-design/icons";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};

const { SubMenu, Item } = Menu;
export default function Channels() {
  const rootSubmenuKeys = ["sub1"];

  const [channelList, setChannelList] = useState(["User"]);
  const [channel, setChannel] = useState({
    name: "",
    details: ""
  });
  const [openKeys, setOpenKeys] = useState(["sub2"]);
  const [modalVisible, setModalVisible] = useState(false);

  const onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(openKeys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const handleModal = e => {
    e.preventDefault();
    setModalVisible(!modalVisible);
  };

  const onFinish = values => {
    console.log("Success:", values);
  };

  return (
    <>
      <Menu
        style={{ backgroundColor: "transparent", width: "100%" }}
        theme="dark"
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
      >
        <Menu.Item key="sub1">
          <a href="# " className="optionLink" onClick={handleModal}>
            <PlusOutlined />
            <span>Add a channel</span>
          </a>
        </Menu.Item>
        <SubMenu
          key="sub2"
          icon={<AppstoreOutlined />}
          title={`CHANNELS (${channelList.length})`}
        >
          {channelList.length !== 0 &&
            channelList.map((channel, index) => (
              <Item key={index}>{`# ${channel}`}</Item>
            ))}
        </SubMenu>
      </Menu>
      <Modal
        title="Add a channel"
        visible={modalVisible}
        onOk={handleModal}
        onCancel={handleModal}
        footer={[]}
      >
        <Form
          {...layout}
          name="basic"
          onFinish={onFinish}
        >
          <Form.Item
            label="Channel's Name"
            name="name"
            rules={[
              { required: true, message: "Please input the channel name!" }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Channel's Details"
            name="details"
            rules={[
              { required: true, message: "Please input the channel details!" }
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
