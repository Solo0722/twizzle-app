import React, { useState, useEffect, useContext } from "react";
import MasonryLayout from "../containers/MasonryLayout";
import { client } from "../utils/client";
import { feedQuery, searchQuery } from "../utils/data";
import styled from "styled-components";
import { AppContext } from "../context/Context";
import { Spin } from "antd";

const Search = () => {
  const { searchTerm } = useContext(AppContext);

  const [pins, setPins] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      setLoading(true);
      const query = searchQuery(searchTerm.toLowerCase());
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
  }, [searchTerm]);

  return (
    <SearchContainer>
      {loading && <Spin />}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== "" && !loading && (
        <h2>No pins found!!</h2>
      )}
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  padding: 0 10px;
`;

export default Search;
