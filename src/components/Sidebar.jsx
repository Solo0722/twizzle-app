import React from "react";
import styled from "styled-components";
import RenderLinks from "./RenderLinks";
import SwitchButton from "./SwitchButton";

const Sidebar = () => {
  return (
    <SidebarContainer>
      <LogoContainer>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <h2>
            twi<span style={{ color: "#6f2da8" }}>zzle</span>
          </h2>
        </div>
        <SwitchButton />
      </LogoContainer>
      <RenderLinks />
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  width: 20%;
  min-height: 100vh;
  float: left;
  /* padding: 5px 5px 10px 5px; */
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
  margin-bottom: 10px;
  padding: 0px 10px;
  width: 100%;

  h2 {
    margin-left: 10px;
    font-weight: bold;
    font-style: oblique;
  }
`;

export default Sidebar;
