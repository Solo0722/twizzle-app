import { Spin } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { AppContext } from "../context/Context";
import { client } from "../utils/client";
import { feedQuery, searchQuery } from "../utils/data";
import MasonryLayout from "./MasonryLayout";

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();
  const { setPins, pins } = useContext(AppContext);

  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);

  if (loading)
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

  if (!pins?.length) return <h2>No pins available!</h2>;

  return <FeedContainer>{pins && <MasonryLayout pins={pins} />}</FeedContainer>;
};

const FeedContainer = styled.div`
  padding: 0 10px;
`;

export default Feed;
