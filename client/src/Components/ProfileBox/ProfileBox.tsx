import React from "react";
import { FaUserCircle } from "react-icons/fa";

const ProfileBox = () => {
  return (
    <div className=" h-[30rem] w-full flex flex-col justify-start items-center">
      <div className="cover-photo w-full h-[40%]  bg-center bg-no-repeat bg-contain flex flex-row">
        Cover Photo
      </div>
      <div className="profile-details w-full relative flex flex-col gap-y-5 border-y-[1px] border-y-slate-200 pb-4">
        <p className="profile-pic flex flex-row justify-between px-10 py-4 items-center w-full">
          <span className="absolute top-[-35px] rounded-full w-[5rem] h-[5rem] bg-center bg-no-repeat bg-contain">
            <FaUserCircle size={75} />
          </span>
          <button className="bg-blue-400 rounded-full px-4 py-2 text-white ml-auto">
            Edit Profile
          </button>
        </p>
        <p className="flex flex-col pl-10">
          <span className="font-bold">Username</span>
          <span className="text-grey">@usename</span>
        </p>
        <p className="description pl-10 h-5 w-ful">
          Write Your Descritpion here
        </p>
        <p className="description pl-11 h-5 w-ful">Joined and the date</p>
        <p className="flex flex-row pl-10 gap-10 mt-2">
          <span>Following</span>
          <span>Followers</span>
        </p>
      </div>
    </div>
  );
};

export default ProfileBox;
