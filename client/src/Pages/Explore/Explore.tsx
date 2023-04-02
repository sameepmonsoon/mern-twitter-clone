import React, { useEffect, useState } from "react";
import LeftSider from "../../Page Components/LeftSider/LeftSider";
import MainTweet from "../../Page Components/Main Tweet/MainTweet";
import RightSider from "../../Page Components/RightSider/RightSider";
import { useSelector } from "react-redux";
import SignIn from "../SignIn/SignIn";
import { HTTPMethods } from "../../Utils/HTTPMethods";
import { current } from "@reduxjs/toolkit";
import TweetContainer from "../../Components/TweetContainer/TweetContainer";
const Explore = () => {
  const currentUser = useSelector((state: any) => state.user);
  const [exploreTweet, setExploreTweet] = useState([]);
  useEffect(() => {
    HTTPMethods.get(`/tweets/explore`)
      .then((res) => {
        setExploreTweet(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentUser._id]);
  return (
    <>
      {!currentUser ? (
        <SignIn />
      ) : (
        <div className=" grid grid-cols-1 md:grid-cols-4">
          <div className="ml-auto">
            <LeftSider />
          </div>
          <div className="py-2 col-span-2 flex flex-col border-x-[1px] border-slate-200 border-t-[1px] border-t-slate-200 min-w-[55vh]">
            {exploreTweet &&
              exploreTweet.map((explore, index) => {
                return (
                  <div key={index}>
                    <TweetContainer
                      profileImage={currentUser.profilePicture}
                      idNumber={index}
                      tweet={explore}
                      editTweet={setExploreTweet}
                    />
                  </div>
                );
              })}
          </div>
          <div className="px-6  hidden lg:block">
            <RightSider />
          </div>
        </div>
      )}
    </>
  );
};

export default Explore;
