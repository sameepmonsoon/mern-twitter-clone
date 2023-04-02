import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { HTTPMethods } from "../../Utils/HTTPMethods";
import Modal from "../Modal/Modal";
import { following } from "../../Redux Store/userSlice";
import { TbCameraPlus } from "react-icons/tb";
const ProfileBox = (props: {
  name: string;
  coverPhoto?: string;
  profilePhoto?: string;
  profileDescription: string;
}) => {
  const { name, coverPhoto, profilePhoto, profileDescription } = props;
  const { currentUser } = useSelector((state: any) => state.user);
  const { followingId } = useSelector((state: any) => state.user);
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const [followData, setFollowData] = useState([]);
  useEffect(() => {
    HTTPMethods.get(`/users/find/${id}`)
      .then((res) => {
        console.log("from teh prooooo", res.data.followers);
        setFollowData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleFollow = () => {
    if (!currentUser.following.includes(id)) {
      HTTPMethods.put(`/users/follow/${id}`, {
        id: currentUser._id,
      }).then((res) => {
        dispatch(following(res.data));
      });
    } else if (currentUser.following.includes(id)) {
      HTTPMethods.put(`/users/unfollow/${id}`, {
        id: currentUser._id,
      }).then((res) => {
        dispatch(following(res.data));
      });
    }
  };
  return (
    <div className=" h-[30rem] w-full flex flex-col justify-start items-center">
      <div className="cover-photo w-full h-[40%] justify-center items-center flex flex-col bg-gray-300">
        <span className="bg-black/50 text-white p-2 rounded-full w-10 h-10 hover:opacity-[0.91] cursor-pointer">
          <TbCameraPlus size={25} />
        </span>
      </div>
      <div className="profile-details w-full relative flex flex-col gap-y-2 border-y-[1px] border-y-slate-200 pb-4">
        <p className="profile-pic flex flex-row justify-between px-10 py-4 items-center w-full">
          <span
            className={`absolute overflow-hidden top-[-80px] left-[20px] rounded-full w-[8rem] h-[8rem]  shadow-[1px_1px_5px_0px_grey,-1px_-1px_5px_0px_grey]  border-black/20 flex justify-center items-center`}>
            <img src={profilePhoto} className="rounded-full w-[92%] h-[92%]" />
          </span>
          {currentUser != undefined && currentUser._id === id ? (
            <button
              className="bg-blue-400 rounded-full px-4 py-2 text-white ml-auto"
              onClick={() => setIsOpen(true)}>
              Edit Profile
            </button>
          ) : currentUser != undefined && currentUser.following.includes(id) ? (
            <button
              className="bg-blue-400 rounded-full px-4 py-2 text-white ml-auto"
              onClick={handleFollow}>
              Following
            </button>
          ) : !currentUser.following.includes(id) ? (
            <button
              className="bg-blue-400 rounded-full px-4 py-2 text-white ml-auto"
              onClick={handleFollow}>
              Follow
            </button>
          ) : (
            ""
          )}
        </p>
        <p className="flex flex-col pl-10">
          <span className="font-bold text-black text-lg">{name}</span>
          <span className="text-grey text-black/70 ">@{name}</span>
        </p>
        <p className="description pl-10 h-5 w-ful">{profileDescription}</p>
        <p className="description pl-11 h-5 w-ful">Joined and the date</p>
        <p className="flex flex-row pl-10 gap-10 mt-2">
          <span>Following</span>
          <span>Followers</span>
        </p>
      </div>
      {isOpen && <Modal setOpen={setIsOpen} />}
    </div>
  );
};

export default ProfileBox;
