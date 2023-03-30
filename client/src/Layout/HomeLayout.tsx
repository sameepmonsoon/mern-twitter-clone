import React from "react";
import { Outlet } from "react-router-dom";
const HomeLayout = () => {
  return (
    <div>
      <div className="navbar h-20 w-screen bg-red-400">Navbar</div>
      <Outlet />
    </div>
  );
};

export default HomeLayout;
