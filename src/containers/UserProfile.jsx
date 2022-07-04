import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";

import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../utils/data";
import { client } from "../utils/client";
import MasonryLayout from "./MasonryLayout";
import { Avatar, Button, Spin } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { provider, auth } from "../utils/firebase";
import { signOut } from "firebase/auth";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState("Created");
  const [activeBtn, setActiveBtn] = useState("created");

  const navigate = useNavigate();
  const { userId } = useParams();

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      navigate("/login");
    });
  };

  useEffect(() => {
    const query = userQuery(userId);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

  useEffect(() => {
    if (text === "Created") {
      const createdPinsQuery = userCreatedPinsQuery(userId);
      client.fetch(createdPinsQuery).then((data) => {
        setPins(data);
      });
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);
      client.fetch(savedPinsQuery).then((data) => {
        setPins(data);
      });
    }
  }, [text, userId]);

  const randomImage =
    "https://source.unsplash.com/1600x900/?nature,technology,lifestyle";

  if (!user) {
    return (
      <Spin
        style={{
          display: "flex",
          alignSelf: "center",
          justifyContent: "center",
          marginTop: "30px",
        }}
      />
    );
  }

  return (
    <UserProfileContainer>
      <BannerPictureContainer>
        <img src={randomImage} alt="random-image" />
        <BannerPhoto>
          <Avatar src={user.image} size="large" />
        </BannerPhoto>
        {userId === user._id && (
          <Button
            icon={<LogoutOutlined />}
            type="text"
            style={{
              position: "absolute",
              top: "0px",
              right: "0px",
              zIndex: "30",
              boxShadow: "0px 2px 4px rgba(0,0,0,0.5)",
            }}
            onClick={signUserOut}
          >
            Log out
          </Button>
        )}
      </BannerPictureContainer>
      <h1>{user.userName}</h1>
      <BtnsContainer>
        <Button
          onClick={(e) => {
            setText(e.target.textContent);
            setActiveBtn("created");
          }}
          shape="round"
          type={`${activeBtn == "created" ? "primary" : "text"}`}
        >
          Created
        </Button>
        <Button
          onClick={(e) => {
            setText(e.target.textContent);
            setActiveBtn("saved");
          }}
          shape="round"
          type={`${activeBtn == "saved" ? "primary" : "text"}`}
        >
          Saved
        </Button>
      </BtnsContainer>
      {pins?.length ? (
        <PinsContainer>
          <MasonryLayout pins={pins} />
        </PinsContainer>
      ) : (
        <p>No pins found!!</p>
      )}
    </UserProfileContainer>
  );
};

const UserProfileContainer = styled.div`
  /* padding: 0 10px; */
  h1 {
    text-align: center;
    font-weight: bolder;
    margin-top: 20px;
  }
`;

const BannerPictureContainer = styled.div`
  width: 100%;
  height: 300px;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const BannerPhoto = styled.div`
  position: absolute;
  bottom: -10px;
  left: 50%;
  border-radius: 50%;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const BtnsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const PinsContainer = styled.div`
  padding: 20px;
`;

export default UserProfile;
