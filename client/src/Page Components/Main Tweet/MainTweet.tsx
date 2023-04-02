import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { HTTPMethods } from "../../Utils/HTTPMethods";

const MainTweet = () => {
  const [textValue, setTextValue] = useState("");
  const { currentUser } = useSelector((state: any) => state.user);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    HTTPMethods.post(`/tweets/`, {
      userId: currentUser._id,
      description: textValue,
    })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <form className="main-tweet-div flex flex-col justify-start items-start h-[8rem] w-full pb-4 border-b-[1px] border-b-slate-200">
      <div className="flex flex-row items-start h-full w-full justify-start gap-x-2 px-3">
        <img
          src={currentUser.profilePicture}
          alt="image"
          className={`w-[3rem] h-[3rem] rounded-full mt-1`}
        />
        <textarea
          typeof="text"
          maxLength={200}
          onChange={(e) => {
            setTextValue(e.target.value);
          }}
          name="description"
          placeholder="Whats Happening?"
          //   className="w-full h-full resize-none text-[20px] bg-transparent rounded-lg p-2 focus:ring-blue-400 focus:ring-1 outline-none"
          className="w-full h-full resize-none text-[20px] bg-transparent rounded-lg p-2 outline-none"></textarea>
      </div>
      <div className="flex-2 flex flex-row justify-between px-10 items-center w-full">
        <div></div>
        <button
          className="tweet rounded-full bg-blue-400 text-white px-7 py-2"
          onClick={handleSubmit}>
          Tweet
        </button>
      </div>
    </form>
  );
};

export default MainTweet;
