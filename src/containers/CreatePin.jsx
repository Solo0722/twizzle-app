import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Button, message, Form, Input, Upload, Select } from "antd";
import {
  DeleteOutlined,
  InboxOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { categories } from "../utils/data";
import { AppContext } from "../context/Context";
import { client } from "../utils/client";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreatePin = () => {
  const { user } = useContext(AppContext);

  const [imageAsset, setImageAsset] = useState(null);

  const navigate = useNavigate();

  const uploadImage = (e) => {
    const { type, name } = e.target.files[0];
    if (
      type === "image/png" ||
      type === "image/jpeg" ||
      type === "image/svg" ||
      type === "image/gif" ||
      type === "image/tiff"
    ) {
      client.assets
        .upload("image", e.target.files[0], {
          contentType: type,
          filename: name,
        })
        .then((document) => {
          setImageAsset(document);
        })
        .catch((err) => console.log(err));
    } else {
      return;
    }
  };

  const onFinish = (values) => {
    console.log("Success:", values);

    const doc = {
      _type: "pin",
      title: values.title,
      about: values.about,
      destination: values.destination,
      image: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: imageAsset?._id,
        },
      },
      userId: user._id,
      postedBy: {
        _type: "postedBy",
        _ref: user._id,
      },
      category: values.category,
    };

    client.create(doc).then(() => {
      navigate("/");
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <CreatePinContainer>
      <h2>Create a new pin</h2>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{ width: "100%" }}
      >
        <Form.Item
          name="imageAsset"
          rules={[
            {
              required: true,
              message: "Please upload an image!",
            },
          ]}
        >
          <Input type="file" onChange={uploadImage} />
        </Form.Item>
        <Form.Item>
          {imageAsset && (
            <>
              <img src={imageAsset?.url} width="100%" height="100%" />
              <Button
                icon={<DeleteOutlined />}
                style={{ marginTop: "10px" }}
                onClick={() => setImageAsset(null)}
              />
            </>
          )}
        </Form.Item>

        <Form.Item
          name="title"
          rules={[
            {
              required: true,
              message: "Please add a pin title",
            },
          ]}
        >
          <Input placeholder="Add your pin title" />
        </Form.Item>

        <Form.Item
          name="about"
          rules={[
            {
              required: true,
              message: "Please enter someting about the pin",
            },
          ]}
        >
          <Input placeholder="What is pin about?" />
        </Form.Item>
        <Form.Item
          name="destination"
          rules={[
            {
              required: true,
              message: "Please enter a destination url",
            },
          ]}
        >
          <Input placeholder="Enter the destination link" />
        </Form.Item>

        <Form.Item
          name="category"
          rules={[
            {
              required: true,
              message: "Please select pin category(s)",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) => option.children.includes(input)}
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
          >
            {categories.map((category) => (
              <Option value={category.name}>{category.name}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Save pin
          </Button>
        </Form.Item>
      </Form>
    </CreatePinContainer>
  );
};

const CreatePinContainer = styled.div`
  padding: 0 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  margin: 0 auto;

  h2 {
    text-align: center;
  }
`;

export default CreatePin;
