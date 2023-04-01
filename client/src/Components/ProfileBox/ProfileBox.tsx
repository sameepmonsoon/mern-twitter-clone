import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { HTTPMethods } from "../../Utils/HTTPMethods";
import Modal from "../Modal/Modal";
import { following } from "../../Redux Store/userSlice";
const ProfileBox = (props: {
  name: string;
  coverPhoto?: string;
  profilePhoto?: string;
  profileDescription: string;
}) => {
  const { name, coverPhoto, profilePhoto, profileDescription } = props;
  const { currentUser } = useSelector((state: any) => state.user);
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const handleFollow = async () => {
    if (!currentUser.following.includes(id)) {
      await HTTPMethods.put(`/users/follow/${id}`, {
        id: currentUser._id,
      }).then((res) => dispatch(following(res.data)));
    } else {
      await HTTPMethods.put(`/users/unfollow/${id}`, {
        id: currentUser._id,
      }).then((res) => dispatch(following(res.data)));
    }
  };
  return (
    <div className=" h-[30rem] w-full flex flex-col justify-start items-center">
      <div className="cover-photo w-full h-[40%]  bg-center bg-no-repeat bg-contain flex flex-row">
        Cover Photo
      </div>
      <div className="profile-details w-full relative flex flex-col gap-y-5 border-y-[1px] border-y-slate-200 pb-4">
        <p className="profile-pic flex flex-row justify-between px-10 py-4 items-center w-full">
          <span
            className={`absolute overflow-hidden top-[-80px] left-[20px] rounded-full w-[10rem] h-[10rem]  shadow-[1px_1px_5px_0px_grey,-1px_-1px_5px_0px_grey]  border-black/20 flex justify-center items-center`}>
            <img src={profilePhoto} className="rounded-full w-[95%] h-[94%]" />
          </span>
          {currentUser._id === id ? (
            <button
              className="bg-blue-400 rounded-full px-4 py-2 text-white ml-auto"
              onClick={() => setIsOpen(true)}>
              Edit Profile
            </button>
          ) : currentUser.following.includes(id) ? (
            <button
              className="bg-blue-400 rounded-full px-4 py-2 text-white ml-auto"
              onClick={handleFollow}>
              Following
            </button>
          ) : (
            <button className="bg-blue-400 rounded-full px-4 py-2 text-white ml-auto">
              Follow
            </button>
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
