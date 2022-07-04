import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { urlFor, client } from "../utils/client";
import { v4 as uuidv4 } from "uuid";
import { MdDownload } from "react-icons/md";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { Button } from "antd";
import styled from "styled-components";
import { AppContext } from "../context/Context";
import { DeleteFilled } from "@ant-design/icons";

const Pin = ({ pin: { postedBy, image, _id, destination, save } }) => {
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);

  const { userInfo, user } = useContext(AppContext);
  const navigate = useNavigate();

  const alreadySaved = !!save?.filter(
    (item) => item.postedBy._id === userInfo?.uid
  )?.length;

  const savePin = (id) => {
    if (!alreadySaved) {
      setSavingPost(true);
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId: userInfo.uid,
            postedBy: {
              _type: "postedBy",
              _ref: userInfo.uid,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
          setSavingPost(false);
        });
    }
  };

  const deletePin = (id) => {
    client.delete(id).then(() => {
      window.location.reload();
    });
  };

  return (
    <PinContainer>
      <Wrapper
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
      >
        <img
          src={urlFor(image).width(250).url()}
          alt="user-post"
          width="100%"
        />
        {postHovered && (
          <ButtonsWrapper>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Button
                icon={<MdDownload />}
                href={`${image?.asset?.url}?dl=`}
                type="text"
                target={"_blank"}
                download
                shape="circle"
                size="small"
                onClick={(e) => e.stopPropagation()}
                style={{
                  backdropFilter: "blur(20px)",
                  background: "rgba(255,255,255,0.5)",
                }}
              />
              {alreadySaved ? (
                <Button size="small" type="primary" shape="round">
                  {save?.length} saved
                </Button>
              ) : (
                <Button
                  size="small"
                  type="primary"
                  shape="round"
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                >
                  {savingPost ? "saving" : "save"}
                </Button>
              )}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {destination && (
                <Button
                  href={destination}
                  target="_blank"
                  rel="noreferrer"
                  shape="circle"
                  type="text"
                  size="small"
                  icon={<BsFillArrowUpRightCircleFill />}
                  style={{
                    backdropFilter: "blur(20px)",
                    background: "rgba(255,255,255,0.5)",
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
              )}
              {postedBy?._id === userInfo?.uid && (
                <Button
                  shape="circle"
                  type="text"
                  size="small"
                  icon={<DeleteFilled />}
                  style={{
                    backdropFilter: "blur(20px)",
                    background: "rgba(255,255,255,0.5)",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(_id);
                  }}
                />
              )}
            </div>
          </ButtonsWrapper>
        )}
      </Wrapper>
      <Link to={`/user-profile/${postedBy?._id}`}>
        <LinkContainer>
          <img
            src={postedBy?.image}
            alt="user-profile"
            width={20}
            height={20}
          />
          <span>{postedBy?.userName}</span>
        </LinkContainer>
      </Link>
    </PinContainer>
  );
};

const PinContainer = styled.div`
  margin: 20px 10px 20px 0px;
  position: relative;
`;

const Wrapper = styled.div`
  width: auto;
  transition: all 0.5s ease-in-out;

  &:hover {
    -webkit-filter: brightness(70%);
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    -ms-transition: all 0.5s ease;
    transition: all 0.5s ease;
    cursor: zoom-in;
  }

  img {
    border-radius: 5px;
  }
`;

const ButtonsWrapper = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 150;
  padding: 10px;
  -webkit-filter: brightness(100%);

  button:hover {
    opacity: 100;
  }
`;

const LinkContainer = styled.div`
  width: 100%;
  padding: 5px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    border-radius: 50%;
    object-fit: cover;
  }
`;
export default Pin;
