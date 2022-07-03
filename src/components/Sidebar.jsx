import React, { useContext } from "react";
import styled from "styled-components";
import { useLocation, NavLink } from "react-router-dom";
import { Button, Avatar } from "antd";
import { HomeFilled, HomeOutlined, RightOutlined } from "@ant-design/icons";
import SwitchButton from "./SwitchButton";
import { AppContext } from "../context/Context";

const Sidebar = () => {
  const location = useLocation();
  const { user } = useContext(AppContext);

  const categories = [
    { name: "Animals" },
    { name: "Photography" },
    { name: "Gaming" },
    { name: "Coding" },
  ];

  return (
    <SidebarContainer>
      <LogoContainer>
        <LogoContainer>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {/* <img src="/logo.png" alt="logo" width="30px" height="30px" /> */}
            <h2>
              twi<span style={{ color: "blue" }}>zzle</span>
            </h2>
          </div>
          {/* <SwitchButton /> */}
        </LogoContainer>
      </LogoContainer>
      <LinksContainer>
        <NavLink to="/">
          <Button
            block
            type="text"
            icon={<HomeOutlined />}
            style={{
              width: "100%",
              textAlign: "left",
            }}
            className={`${({ isActive }) =>
              isActive ? "active" : "notActive"}`}
          >
            Home
          </Button>
        </NavLink>
        <p>Discover categories</p>
        {categories.map((cat, i) => (
          <NavLink to={`/category/${cat.name}`} key={i}>
            <Button
              block
              type="text"
              icon={<HomeFilled />}
              style={{ width: "100%", textAlign: "left", marginBottom: "20px" }}
              className={`${({ isActive }) =>
                isActive ? "active" : "notActive"}`}
            >
              {cat.name}
            </Button>
          </NavLink>
        ))}
      </LinksContainer>
      {user && (
        <UserContainer>
          <div>
            <Avatar src={user?.image} />
            <span style={{ marginLeft: "10px" }}>{user?.userName}</span>
          </div>
        </UserContainer>
      )}
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  width: 20%;
  min-height: 100vh;
  float: left;
  padding: 10px 5px 10px 5px;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  bottom: 0;
  overflow-y: auto;

  ::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 768px) {
    & {
      display: none;
    }
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  margin-left: 5px;
  width: 100%;

  h2 {
    margin-left: 10px;
    font-weight: bold;
    font-style: oblique;
  }
`;

const LinksContainer = styled.div`
  width: 100%;

  p {
    padding-left: 15px;
    margin-top: 10px;
  }
`;

const UserContainer = styled.div`
  position: absolute;
  bottom: 10px;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.5);
  padding: 10px;
`;

export default Sidebar;
