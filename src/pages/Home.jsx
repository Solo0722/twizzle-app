import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { client } from "../utils/client";
import { userQuery } from "../utils/data";
import Sidebar from "../components/Sidebar";
import { Routes, Route } from "react-router-dom";
import UserProfile from "../containers/UserProfile";
import Pins from "../containers/Pins";
import { AppContext } from "../context/Context";

const Home = () => {
  const { userInfo, setUser } = useContext(AppContext);

  useEffect(() => {
    const query = userQuery(userInfo?.uid);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);

  return (
    <>
      <Sidebar />
      <HomeContainer className="home">
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins />} />
        </Routes>
      </HomeContainer>
    </>
  );
};

const HomeContainer = styled.div`
  width: 80%;
  min-height: 100vh;
  float: right;
  /* padding: 10px 20px; */

  @media screen and (max-width: 768px) {
    & {
      width: 100%;
    }
  }
`;

export default Home;
