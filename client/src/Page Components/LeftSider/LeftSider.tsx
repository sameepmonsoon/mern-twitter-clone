import React from "react";
import { RiHome7Fill, FaHashtag, FaUser } from "react-icons/all";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux Store/userSlice";
const LeftSider = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    setTimeout(() => {
      navigate("/signin");
    }, 200);
  };
  return (
    <div className="h-full md:h-[90vh] flex flex-col justify-between  m-auto mr-6">
      <div className="mt-6 flex flex-col space-y-4 justify-center">
        <Link to={"/"}>
          <span
            className={`flex flex-row justify-start items-center gap-x-3 px-3 py-3 hover:bg-slate-200 rounded-full cursor-pointer ${
              location.pathname === "/" && "font-[600] text-black/100"
            }  text-xl font-[400] text-black/70`}>
            <RiHome7Fill size={25} />
            <span className="hidden md:flex">Home</span>
          </span>
        </Link>
        <Link to={"/explore"}>
          <span
            className={`flex flex-row justify-start items-center gap-x-3 px-3 py-3 hover:bg-slate-200 rounded-full cursor-pointer ${
              location.pathname.includes("/explore") &&
              " font-[600] text-black/100"
            }  text-xl font-[400] text-black/70`}>
            <FaHashtag size={25} />
            <span className="hidden md:flex">Explore</span>
          </span>
        </Link>
        <Link to={"/profile/:"}>
          <span
            className={`flex flex-row justify-start items-center gap-x-3 px-3 py-3 hover:bg-slate-200 rounded-full cursor-pointer ${
              location.pathname.includes("/profile/") &&
              " font-[600] text-black/100"
            }  text-xl font-[400] text-black/70`}>
            <FaUser size={25} />
            <span className=" hidden md:flex">Profile</span>
          </span>
        </Link>
      </div>
      <div className="login flex justify-between">
        <div className="username flex flex-col">
          <span className="font-bold">username</span>
          <span className="font-bold">@username</span>
        </div>
        <div>
          <button
            className="rounded-full px-4 py-2 text-white bg-blue-400"
            onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeftSider;
