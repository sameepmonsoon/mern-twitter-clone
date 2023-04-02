import React, { useContext } from "react";
import { RiHome7Fill, FaHashtag, FaUser, RxCross2 } from "react-icons/all";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux Store/userSlice";
import { MyContext } from "../../App";
const LeftSider = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    setTimeout(() => {
      navigate("/signin");
    }, 200);
  };
  const { currentUser } = useSelector((state: any) => state.user);
  const { siderState, setSiderState } = useContext(MyContext);
  return (
    <MyContext.Consumer>
      {(value) => (
        <>
          <div className="hidden h-full md:h-[90vh] md:flex flex-col justify-between  m-auto mr-6 relative">
            <div className="mt-6 flex flex-col space-y-4 justify-center md:items-end lg:items-start">
              <Link to={"/"}>
                <span
                  className={`flex flex-row justify-start md:justify-end lg:justify-start  items-center gap-x-3 px-4 py-3  hover:bg-black/10 rounded-full cursor-pointer ${
                    location.pathname === "/" && "font-[600] text-black/100"
                  }  text-xl font-[400] text-black/70`}>
                  <RiHome7Fill size={25} />
                  <span className="hidden lg:flex ">Home</span>
                </span>
              </Link>
              <Link to={"/explore"}>
                <span
                  className={`flex flex-row justify-start md:justify-end lg:justify-start items-center gap-x-3 px-4 py-3 hover:bg-slate-200 rounded-full cursor-pointer ${
                    location.pathname.includes("/explore") &&
                    " font-[600] text-black/100"
                  }  text-xl font-[400] text-black/70`}>
                  <FaHashtag size={25} />
                  <span className="hidden  lg:flex">Explore</span>
                </span>
              </Link>
              <Link to={`/profile/${currentUser._id}`}>
                <span
                  className={`flex flex-row justify-start md:justify-end lg:justify-start items-center gap-x-3 px-4 py-3 hover:bg-slate-200 rounded-full cursor-pointer ${
                    location.pathname.includes("/profile/") &&
                    " font-[600] text-black/100"
                  }  text-xl font-[400] text-black/70`}>
                  <FaUser size={25} />
                  <span className="hidden lg:flex">Profile</span>
                </span>
              </Link>
            </div>
            <div className="login flex flex-col lg:flex-row justify-between items-center gap-1 w-[14rem] absolute bottom-[-5px] lf:left-[-5rem] left-[-5rem] lg:hover:bg-black/10 py-1.5 px-5 rounded-full">
              <img
                src={currentUser.profilePicture}
                alt=""
                className="w-10 h-10 rounded-full"
              />
              <div className="username flex flex-col justify-center items-center">
                <span className="font-bold">{currentUser.username}</span>
                <span className="text-black/60">@{currentUser.username}</span>
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

          <>
            {/* <div
              className={`md:hidden absolute h-[119vh] w-[97.7vw] bg-black/20  transition-all transform duration-1000  ${
                siderState
                  ? "left-0 top-0 opacity-100"
                  : "left-[-30rem] top-0 opacity-0"
              }`}></div> */}
            <div
              className={`h-[100vh] md:hidden flex flex-col justify-between m-auto mr-6  bg-white w-[75%] left-0 top-0 absolute transition-all transform duration-1000 z-10
                 ${siderState ? "left-0 top-0" : "left-[-40rem] top-0"}`}>
              <div className=" mt-6 flex flex-col space-y-4 justify-center md:items-end lg:items-start">
                <p className="flex justify-between items-center px-4">
                  <span className="font-bold">Account Info</span>
                  <RxCross2
                    size={22}
                    onClick={() => setSiderState((prev: boolean) => !prev)}
                    className="cursor-pointer"
                  />
                </p>
                <div className="login flex flex-row justify-start items-center gap-4 w-[14rem] relative left-0 px-3  hover:bg-black/10  rounded-full">
                  <img
                    src={currentUser.profilePicture}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="username flex flex-col justify-center items-center">
                    <span className="font-bold">{currentUser.username}</span>
                    <span className="text-black/60">
                      @{currentUser.username}
                    </span>
                  </div>
                </div>
                <Link to={"/"}>
                  <span
                    className={` flex flex-row justify-start md:justify-end lg:justify-start  items-center gap-x-3 px-4 py-3  hover:bg-black/10 rounded-full cursor-pointer ${
                      location.pathname === "/" && "font-[600] text-black/100"
                    }  text-xl font-[400] text-black/70`}>
                    <RiHome7Fill size={25} />
                    <span className=" md:hidden lg:flex ">Home</span>
                  </span>
                </Link>
                <Link to={"/explore"}>
                  <span
                    className={`flex flex-row justify-start md:justify-end lg:justify-start items-center gap-x-3 px-4 py-3 hover:bg-slate-200 rounded-full cursor-pointer ${
                      location.pathname.includes("/explore") &&
                      " font-[600] text-black/100"
                    }  text-xl font-[400] text-black/70`}>
                    <FaHashtag size={25} />
                    <span className="md:hidden lg:flex">Explore</span>
                  </span>
                </Link>
                <Link to={`/profile/${currentUser._id}`}>
                  <span
                    className={`flex flex-row justify-start md:justify-end lg:justify-start items-center gap-x-3 px-4 py-3 hover:bg-slate-200 rounded-full cursor-pointer ${
                      location.pathname.includes("/profile/") &&
                      " font-[600] text-black/100"
                    }  text-xl font-[400] text-black/70`}>
                    <FaUser size={25} />
                    <span className="md:hidden lg:flex">Profile</span>
                  </span>
                </Link>
              </div>
              <div className="login flex flex-col justify-between items-center gap-1 w-[14rem] absolute bottom-2 md:bottom-[-5px] left-[-25px] md:left-[-5rem] hover:bg-black/10 py-1.5 px-4 rounded-full">
                <div>
                  <button
                    className="rounded-full px-4 py-2 text-white bg-blue-400"
                    onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </>
        </>
      )}
    </MyContext.Consumer>
  );
};

export default LeftSider;
