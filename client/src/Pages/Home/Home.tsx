import React from "react";
import LeftSider from "../../Page Components/LeftSider/LeftSider";
import MainTweet from "../../Page Components/Main Tweet/MainTweet";
import RightSider from "../../Page Components/RightSider/RightSider";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TimelineTweet from "../../Page Components/Timeline Tweet/TimelineTweet";
const Home = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  return (
    <div className=" grid grid-cols-1 md:grid-cols-4">
      <div className="ml-auto">
        <LeftSider />
      </div>
      <div className="py-10 col-span-2 flex flex-col border-x-[1px] border-slate-200 border-t-[1px] border-t-slate-200 ">
        <MainTweet />
        <TimelineTweet />
      </div>
      <div className="px-6">
        <RightSider />
      </div>
    </div>
  );
};

export default Home;
