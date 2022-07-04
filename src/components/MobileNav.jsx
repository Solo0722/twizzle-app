import React from "react";
import Drawerbar from "./Drawerbar";
import styled from "styled-components";
import SwitchButton from "./SwitchButton";
import { useNavigate } from "react-router-dom";

const MobileNav = () => {
  const navigate = useNavigate();
  return (
    <TitleBar className="mobileNav">
      <div>
        <Drawerbar />
        <h2 onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          twi<span style={{ color: "blue" }}>zzle</span>
        </h2>
      </div>
      <SwitchButton />
    </TitleBar>
  );
};

const TitleBar = styled.div`
  width: 100%;
  display: none;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  height: 55px;
  /* backdrop-filter: blur(10px); */
  position: sticky;
  top: 0;
  z-index: 100;

  h2 {
    font-style: oblique;
    font-weight: bold;
    margin-top: 7px;
    margin-left: 5px;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  @media screen and (max-width: 768px) {
    & {
      display: flex;
    }
  }
`;

export default MobileNav;
