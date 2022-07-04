import { Button } from "antd";
import React from "react";
import styled from "styled-components";
import image1 from "../assets/image1.jpg";
import { client } from "../utils/client";
import { GoogleOutlined } from "@ant-design/icons";
import { auth, provider } from "../utils/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        localStorage.setItem("user", JSON.stringify(result.user));
        const { displayName, photoURL, uid } = result.user;

        const doc = {
          _id: uid,
          _type: "user",
          userName: displayName,
          image: photoURL,
        };

        console.log(doc);

        client.createIfNotExists(doc).then(() => {
          navigate("/", { replace: true });
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <LoginContainer>
      <div style={{ zIndex: "50" }}>
        <LogoContainer>
          <img src="/logo.png" alt="" width={30} height={30} />
          <h1
            style={{ marginLeft: "10px", color: "#6f2da8", fontWeight: "bold" }}
          >
            twizzle
          </h1>
        </LogoContainer>
        <Button
          type="primary"
          style={{ marginTop: "10px" }}
          icon={<GoogleOutlined />}
          onClick={signInWithGoogle}
        >
          Sign in with google
        </Button>
      </div>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-image: url(${image1});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top center;
  background-origin: 0px 0px;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(to bottom right, black, black);
    opacity: 0.6;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: center;
`;

export default Login;
