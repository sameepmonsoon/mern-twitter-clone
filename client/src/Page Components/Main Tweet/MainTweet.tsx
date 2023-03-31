import React from "react";
import { FaRegUserCircle } from "react-icons/fa";

const MainTweet = () => {
  return (
    <form className="main-tweet-div flex flex-col justify-start items-center h-[14rem] gap-10  w-full pb-4">
      <div className="flex flex-row items-start h-full w-full justify-start gap-x-10 px-3">
        {/* <img src="" alt="image" /> */}
        <FaRegUserCircle size={40} />
        <textarea
          typeof="text"
          maxLength={200}
          placeholder="Whats Happening?"
          className="w-full h-full resize-none bg-slate-100 rounded-lg p-2"></textarea>
      </div>
      <div className="flex-2 flex flex-row justify-between px-10 items-center w-full">
        <div>vss</div>
        <button className="tweet rounded-full bg-blue-400 text-white px-7 py-2">
          Tweet
        </button>
      </div>
    </form>
  );
};

export default MainTweet;
