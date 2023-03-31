import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import image from "../../../public/vite.svg";
import { useSelector } from "react-redux";
import { HTTPMethods } from "../../Utils/HTTPMethods";
import { Link, useLocation, useParams } from "react-router-dom";
const TweetContainer = (props: {
  idNumber?: number;
  tweet?: any;
  editTweet?: Dispatch<SetStateAction<never[]>>;
  image?: string;
}) => {
  const { idNumber, tweet, editTweet, image } = props;
  const [tweetData, setTweetData] = useState([]);
  const { currentUser } = useSelector((state: any) => state.user);
  const [userData, setUserData] = useState<any>([]);
  const { id } = useParams();
  console.log("the tweet from the timeline", tweet);
  useEffect(() => {
    tweet != undefined &&
      HTTPMethods.get(`/users/find/${tweet.userId}`).then((res) => {
        setUserData(res.data);
      });
  }, []);
  const handleLike = async (e: any) => {
    e.preventDefault();
    await HTTPMethods.put(`/tweets/${tweet._id}/like`, {
      id: currentUser._id,
    }).then((res) => {
      console.log(res);
      if (location.pathname.includes("profile")) {
        const newData = HTTPMethods.get(`/tweets/user/all/${id}`);
        //@ts-ignore
        editTweet(newData);
      } else if (location.pathname.includes("explore")) {
        const newData = HTTPMethods.get(`/tweets/explore`);
        //@ts-ignore
        editTweet(newData);
      } else {
        const newData = HTTPMethods.get(`/tweets/timeline/${currentUser._id}`);
        //@ts-ignore
        editTweet(newData);
      }
    });
  };
  return (
    <div
      key={idNumber}
      className="flex flex-row min-h-[10rem] h-auto w-full py-3 px-2 gap-x-3 border-y-[1px] border-y-slate-200 justify-start items-start">
      <div className="tweet-owner min-h-[10rem] h-auto flex flex-col justify-start items-center min-w-[5.5rem] overflow-hidden">
        <Link
          to={`/profile/${userData._id}`}
          className={`w-full h-20 rounded-full bg-[url("../../../public/vite.svg")] bg-no-repeat bg-contain bg-center`}
        />
      </div>
      <div className="tweet-body flex flex-col gap-y-3">
        <p className="flex flex-row justify-start items-center">
          {userData.username} <span>@{userData.username}</span>
          <span></span>
        </p>
        <p className="tweetdescription pr-10 ">
          {tweet != undefined && tweet.description}
        </p>
        {image && (
          <p className="h-auto w-[98%] overflow-hidden rounded-lg border-[1px] border-slate-200 inline-flex">
            <span className="min-h-[20rem] h-auto max-h-[30rem] min-w-[50%] w-full flex justify-center items-center overflow-hidden bg-red-400">
              <img src={image} alt="" className=" h-full w-full" />
            </span>
          </p>
        )}

        <p className="reaction-container w-full h-10 flex flex-row justify-start items-center px-2 gap-2">
          <button className="font-bold text-black" onClick={handleLike}>
            {tweet != undefined && tweet.likes.includes(currentUser._id) ? (
              <IoMdHeart size={25} />
            ) : (
              <IoMdHeartEmpty size={25} />
            )}
          </button>
          <span>{tweet != undefined && tweet.likes.length}</span>
        </p>
      </div>
    </div>
  );
};

export default TweetContainer;
