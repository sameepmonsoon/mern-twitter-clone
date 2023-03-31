import React from "react";
import ProfileBox from "../../Components/ProfileBox/ProfileBox";
import LeftSider from "../../Page Components/LeftSider/LeftSider";
import MainTweet from "../../Page Components/Main Tweet/MainTweet";
import RightSider from "../../Page Components/RightSider/RightSider";

const Profile = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4">
      <LeftSider />
      <div className="py-10 px-6 col-span-2 flex border-x-[1px] border-slate-200 border-t-[1px] border-t-slate-200 ">
        <ProfileBox />
      </div>
      <div className="px-6">
        <RightSider />
      </div>
    </div>
  );
};

export default Profile;
