import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import image from "../../../public/vite.svg";
import { useSelector } from "react-redux";
import { HTTPMethods } from "../../Utils/HTTPMethods";
import { Link, useLocation, useParams } from "react-router-dom";
import formatDistance from "date-fns/formatDistance";
const TweetContainer = (props: {
  idNumber: number;
  tweet: any;
  editTweet: Dispatch<SetStateAction<never[]>>;
  image?: string;
  profileImage?: string;
}) => {
  const { idNumber, tweet, editTweet, image, profileImage } = props;
  const [tweetData, setTweetData] = useState([]);
  const { currentUser } = useSelector((state: any) => state.user);
  const [userData, setUserData] = useState<any>([]);
  const { id } = useParams();
  const datePosted = formatDistance(new Date(), new Date(tweet.createdAt));
  useEffect(() => {
    tweet != undefined &&
      HTTPMethods.get(`/users/find/${tweet.userId}`).then((res) => {
        setUserData(res.data);
      });
  }, [tweet.userId]);
  const handleLike = async (e: any) => {
    e.preventDefault();
    await HTTPMethods.put(`/tweets/${tweet._id}/like`, {
      id: currentUser._id,
    }).then((res) => {
      if (location.pathname.includes("profile")) {
        HTTPMethods.get(`/tweets/user/all/${id}`)
          .then((res) => {
            editTweet(res.data);
          })
          .catch((err) => console.log(err));
      } else if (location.pathname.includes("explore")) {
        HTTPMethods.get(`/tweets/explore`)
          .then((res) => {
            editTweet(res.data);
          })
          .catch((err) => console.log(err));
      } else {
        HTTPMethods.get(`/tweets/timeline/${currentUser._id}`)
          .then((res) => {
            editTweet(res.data);
          })
          .catch((err) => console.log(err));
      }
    });
  };
  return (
    <div
      key={idNumber}
      className="cursor-pointer flex flex-row min-h-[7rem] h-auto  w-full py-2 px-5 gap-x-0 border-b-[1px] border-b-slate-200  hover:bg-black/5 justify-start items-start">
      {/* <div className="tweet-owner min-h-[5rem] h-auto flex flex-col justify-start items-center min-w-[4.5rem] overflow-hidden">
        {userData != undefined && (
          <Link to={`/profile/${userData._id}`}>
            <img
              src={profileImage}
              alt=""
              className={`w-[3rem] h-[3rem] rounded-full mt-1`}
            />
          </Link>
        )}
      </div> */}
      <div className="tweet-body flex flex-col gap-y-3">
        {userData != undefined && (
          <p className="flex flex-row justify-start items-center gap-1">
            <Link to={`/profile/${userData._id}`}>
              <span className="font-[500]"> {userData.username}</span>
              <span className="text-black/70">@{userData.username}</span> 
            </Link>

            <span className="text-black/70 "> {datePosted}</span>
          </p>
        )}

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

        <p
          className={`group w-[30%] h-10 flex flex-row justify-start items-center px-2 gap-2.5 relative `}
          onClick={handleLike}>
          <div className="absolute left-[1px] top-[3px] group-hover:bg-red-200 w-8 h-8 rounded-full z-[-1]">
            &nbsp;
          </div>
          <button className="font-bold text-black/70 group-hover:text-red-400">
            {tweet != undefined && tweet.likes.includes(currentUser._id) ? (
              <IoMdHeart
                size={18}
                className="text-red-500 group-hover:text-red-500"
              />
            ) : (
              <IoMdHeartEmpty size={18} className="group-hover:text-red-500" />
            )}
          </button>
          <span
            className={`${
              tweet != undefined &&
              tweet.likes.length &&
              tweet.likes.includes(currentUser._id) &&
              "text-red-500"
            } group-hover:text-red-500 text-[15px]`}>
            {tweet != undefined && tweet.likes.length}
          </span>
        </p>
      </div>
    </div>
  );
};

export default TweetContainer;
