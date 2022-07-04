import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Input, Avatar, Button } from "antd";
import React, { useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/Context";

const Navbar = () => {
  const { user, setSearchTerm, searchTerm } = useContext(AppContext);

  const navigate = useNavigate();

  return (
    <NavbarContainer>
      <Input
        placeholder="Search"
        prefix={<SearchOutlined />}
        style={{
          marginRight: "10px",
          borderRadius: "5px",
        }}
        type="text"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        onFocus={() => navigate("/search")}
      />
      {user && (
        <>
          <Avatar
            style={{
              marginRight: "10px",
              cursor: "pointer",
              background: "blue",
            }}
            shape="square"
            src={user?.image}
            onClick={() => navigate(`/user-profile/${user?._id}`)}
          />
          <Button icon={<PlusOutlined />} type="primary" href="/create-pin" />
        </>
      )}
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
