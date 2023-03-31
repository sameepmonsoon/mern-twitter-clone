import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Profile from "../Pages/Profile/Profile";

const ProfileLayout = () => {
  return (
    <div className="">
      <Navbar title={"Profile"} />
      <Profile />
      <Outlet />
    </div>
  );
};

export default ProfileLayout;
