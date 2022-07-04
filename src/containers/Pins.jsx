import React, { useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import MobileNav from "../components/MobileNav";
import Navbar from "../components/Navbar";
import { AppContext } from "../context/Context";
import CreatePin from "./CreatePin";
import Feed from "./Feed";
import PinDetail from "./PinDetail";
import Search from "./Search";

const Pins = () => {  

  return (
    <div>
      <MobileNav />
      <Navbar />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/category/:categoryId" element={<Feed />} />
        <Route path="/pin-detail/:pinId" element={<PinDetail />} />
        <Route path="/create-pin" element={<CreatePin />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  );
};

export default Pins;
