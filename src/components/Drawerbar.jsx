import React, { useState } from "react";
import { Button, Drawer, Switch } from "antd";
import { CloseCircleOutlined, MenuOutlined } from "@ant-design/icons";
// import MobileSidebar from "./MobileSidebar";
import styled from "styled-components";
import { FaMoon, FaSun } from "react-icons/fa";
import SwitchButton from "./SwitchButton";
import RenderLinks from "./RenderLinks";

const Drawerbar = () => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <DrawerbarContainer>
      <Button icon={<MenuOutlined />} type="text" onClick={showDrawer} />
      <Drawer
        placement="left"
        onClose={onClose}
        visible={visible}
        closeIcon={<CloseCircleOutlined />}
        width={"70%"}
        bodyStyle={{ padding: "0px" }}
        headerStyle={{ display: "none" }}
        // title={
        //   <TitleBar>
        //     <h2>
        //       twi<span style={{ color: "blue" }}>zzle</span>
        //     </h2>
        //   </TitleBar>
        // }
      >
        <RenderLinks onClose={onClose} />
      </Drawer>
    </DrawerbarContainer>
  );
};

const DrawerbarContainer = styled.div`
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TitleBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-style: oblique;
    font-weight: bold;
    margin-top: 5px;
  }
`;

export default Drawerbar;
