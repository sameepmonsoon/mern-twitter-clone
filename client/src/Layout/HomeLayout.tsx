import React, { useContext, createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import LeftSider from "../Page Components/LeftSider/LeftSider";
import Navbar from "../Components/Navbar/Navbar";
const HomeLayout = () => {
  return (
    <div className="">
      <Navbar title={"Home"} />

      <Outlet />
    </div>
  );
};

export default HomeLayout;
