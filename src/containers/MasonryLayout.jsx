import React, { useContext } from "react";
import Masonry from "react-masonry-css";
import Pin from "../components/Pin";

const breakpointObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

const MasonryLayout = ({ pins }) => {
  return (
    <Masonry
      breakpointCols={breakpointObj}
      style={{ width: "100%", display: "flex" }}
    >
      {pins?.map((pin) => (
        <Pin key={pin._id} pin={pin} />
      ))}
    </Masonry>
  );
};

export default MasonryLayout;
