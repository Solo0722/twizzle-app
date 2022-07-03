import React, { useState } from "react";
import { Button, Drawer, Switch } from "antd";
import { CloseCircleOutlined, MenuOutlined } from "@ant-design/icons";
// import MobileSidebar from "./MobileSidebar";
import styled from "styled-components";
import { FaMoon, FaSun } from "react-icons/fa";
import SwitchButton from "./SwitchButton";

const Drawerbar = () => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <div>
      <Button icon={<MenuOutlined />} type="text" onClick={showDrawer} />
      <Drawer
        placement="left"
        onClose={onClose}
        visible={visible}
        closeIcon={<CloseCircleOutlined />}
        width={"80%"}
        title={
          <TitleBar>
            <h3>
              Stream<span style={{ color: "blue" }}>line</span>
            </h3>
            {/* <SwitchButton /> */}
          </TitleBar>
        }
      >
        {/* <MobileSidebar /> */}
      </Drawer>
    </div>
  );
};

const TitleBar = styled.div`
  width: 100%;
  display: flex;
  /* flex-direction: row; */
  justify-content: space-between;
  align-items: center;
  /* padding: 10px; */

  h3 {
    font-style: oblique;
    font-weight: bold;
    margin-top: 5px;
  }
`;

export default Drawerbar;
