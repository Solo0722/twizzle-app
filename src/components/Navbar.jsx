import {
  PlusOutlined,
  PlusSquareFilled,
  PlusSquareTwoTone,
  SearchOutlined,
} from "@ant-design/icons";
import { Input, Avatar, Button } from "antd";
import React from "react";
import styled from "styled-components";

const Navbar = () => {
  return (
    <NavbarContainer>
      <Input
        placeholder="Search"
        prefix={<SearchOutlined />}
        style={{
          marginRight: "10px",
        }}
      />
      <Avatar
        style={{ marginRight: "10px", cursor: "pointer", background: "blue" }}
        shape="square"
      >
        R
      </Avatar>
      <Button icon={<PlusOutlined />} type="primary" href="/create-pin" />
    </NavbarContainer>
  );
};

const NavbarContainer = styled.nav`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 0 10px;
`;

export default Navbar;
