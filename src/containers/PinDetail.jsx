import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AppContext } from "../context/Context";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { client, urlFor } from "../utils/client";
import { pinDetailMorePinQuery, pinDetailQuery } from "../utils/data";
import MasonryLayout from "./MasonryLayout";
import { Avatar, Button, Input, Spin } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const PinDetail = () => {
  const { user } = useContext(AppContext);

  const [pins, setPins] = useState(null);
  const [pinDetail, setPinDetail] = useState(null);
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);

  const { pinId } = useParams();

  const addComment = () => {
    if (comment) {
      setAddingComment(true);

      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert("after", "comments[-1]", [
          {
            comment,
            key: uuidv4(),
            postedBy: {
              _type: "postedBy",
              _ref: user._id,
            },
          },
        ])
        .commit()
        .then(() => {
          fetchPinDetails();
          setComment("");
          window.location.reload();
          setAddingComment(false);
        });
    }
  };

  const fetchPinDetails = () => {
    let query = pinDetailQuery(pinId);

    if (query) {
      client.fetch(query).then((data) => {
        setPinDetail(data[0]);

        if (data[0]) {
          query = pinDetailMorePinQuery(data[0]);

          if (query) {
            client.fetch(query).then((res) => {
              setPins(res);
            });
          }
        }
      });
    }
  };

  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);

  if (!pinDetail)
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

  return (
    <PinDetailContainer>
      <ImageContainer>
        <img
          src={pinDetail?.image && urlFor(pinDetail.image).url()}
          alt="pin-image"
        />
      </ImageContainer>
      <ButtonsContainer>
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          href={`${pinDetail.image?.asset?.url}?dl=`}
          target={"_blank"}
          download
        >
          Download
        </Button>
        <Button
          href={pinDetail.destination}
          target="_blank"
          rel="noreferrer"
          type="link"
        >
          {pinDetail.destination}
        </Button>
      </ButtonsContainer>
      <BodyContainer>
        <h1>{pinDetail.title}</h1>
        <p>{pinDetail.about}</p>

        <Link to={`/user-profile/${pinDetail.postedBy?._id}`}>
          <LinkContainer>
            <img
              src={pinDetail.postedBy?.image}
              alt="user-profile"
              width={30}
              height={30}
            />
            <span>{pinDetail.postedBy?.userName}</span>
          </LinkContainer>
        </Link>
      </BodyContainer>
      <CommentSection>
        <h2>Comments</h2>
        {!pinDetail?.comments
          ? "Be the first to comment on this pin"
          : pinDetail?.comments?.map((comment, i) => (
              <div>
                <Avatar src={comment.postedBy.image} size="small" />
                <span style={{ fontWeight: "bold", marginLeft: "10px" }}>
                  {comment.postedBy.userName}
                </span>{" "}
                : <span>{comment.comment}</span>
              </div>
            ))}

        <CommentForm>
          <Input
            placeholder="Add a comment"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button type="primary" onClick={addComment}>
            {addingComment ? "Adding the comment" : "Add a comment"}
          </Button>
        </CommentForm>
      </CommentSection>
      {pins?.length > 0 && (
        <MoreContainer>
          <h2>More like this</h2>
          <MasonryLayout pins={pins} />
        </MoreContainer>
      )}
    </PinDetailContainer>
  );
};

const PinDetailContainer = styled.div`
  padding: 30px 10px 10px 10px;
`;

const ImageContainer = styled.div`
  width: 100%;
  margin: 0 auto;

  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;

  h1 {
    font-weight: bolder;
  }
`;

const LinkContainer = styled.div`
  /* width: 20%; */
  padding: 5px 0;
  display: flex;
  align-items: center;
  justify-content: left;

  img {
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
  }
`;

const CommentSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;

  h2 {
    font-weight: bold;
  }
`;

const CommentForm = styled.div`
  margin-top: 20px;

  input {
    margin-bottom: 10px;
  }
`;

const MoreContainer = styled.div`
  h2 {
    text-align: center;
  }
`;
export default PinDetail;
