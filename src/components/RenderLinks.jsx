import React, { useContext } from "react";
import styled from "styled-components";
import SwitchButton from "./SwitchButton";
import { AppContext } from "../context/Context";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { Button, Avatar, List } from "antd";
import { HomeFilled, HomeOutlined } from "@ant-design/icons";
import { categories } from "../utils/data";

const RenderLinks = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AppContext);

  return (
    <div>
      <LinksContainer>
        <List>
          <List.Item style={{ width: "100%", border: "none" }}>
            <NavLink to="/" style={{ width: "100%" }}>
              <Button
                block
                onClick={onClose}
                type="text"
                icon={<HomeOutlined />}
                style={{
                  width: "100%",
                  textAlign: "left",
                  opacity: `${location.pathname === "/" ? "1" : "0.7"}`,
                  fontWeight: `${location.pathname === "/" ? "bold" : ""}`,
                }}
                className={`${({ isActive }) =>
                  isActive ? "isActive" : "notActive"}`}
              >
                Home
              </Button>
            </NavLink>
          </List.Item>
        </List>

        <p style={{ fontSize: "13px" }}>Discover categories</p>
        <List>
          {categories.map((category) => (
            <List.Item style={{ width: "100%", border: "none" }}>
              <NavLink
                to={`/category/${category.name}`}
                style={{ width: "100%" }}
              >
                <Button
                  type="text"
                  block
                  onClick={onClose}
                  className={`${({ isActive }) =>
                    isActive ? "isActive" : "notActive"}`}
                  icon={
                    <img
                      src={category.image}
                      width={20}
                      height={20}
                      style={{ borderRadius: "50%", marginRight: "10px" }}
                    />
                  }
                  style={{
                    width: "100%",
                    textAlign: "left",
                    opacity: `${
                      location.pathname === `/category/${category.name}`
                        ? "1"
                        : "0.7"
                    }`,
                    fontWeight: `${
                      location.pathname === `/category/${category.name}`
                        ? "bold"
                        : ""
                    }`,
                  }}
                >
                  {category.name}
                </Button>
              </NavLink>
            </List.Item>
          ))}
        </List>
      </LinksContainer>
      {user && (
        <UserContainer className="userProfile" onClick={() => navigate(`/user-profile/${user._id}`)}>
          <div>
            <Avatar src={user?.image} />
            <span style={{ marginLeft: "10px" }}>{user?.userName}</span>
          </div>
        </UserContainer>
      )}
    </div>
  );
};

const LinksContainer = styled.div`
  width: 100%;

  p {
    padding-left: 15px;
    margin-top: 10px;
  }
`;

const UserContainer = styled.div`
  /* position: absolute; */
  /* bottom: 10px; */
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  padding: 10px;
`;

export default RenderLinks;
