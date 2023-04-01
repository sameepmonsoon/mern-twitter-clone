import React, { useState, useEffect } from "react";
import ProfileBox from "../../Components/ProfileBox/ProfileBox";
import LeftSider from "../../Page Components/LeftSider/LeftSider";
import MainTweet from "../../Page Components/Main Tweet/MainTweet";
import RightSider from "../../Page Components/RightSider/RightSider";
import { useSelector, useDispatch } from "react-redux";

import { useLocation, useParams } from "react-router-dom";
import { HTTPMethods } from "../../Utils/HTTPMethods";
import TweetContainer from "../../Components/TweetContainer/TweetContainer";
const Profile = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  const [userTweet, setUserTweet] = useState([]);
  const [userProfile, setUserProfile] = useState([]);
  const { id } = useParams();
  const location = useLocation();
  useEffect(() => {
    HTTPMethods.get(`/tweets/user/all/${id}`)
      .then((res) => {
        setUserTweet(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    HTTPMethods.get(`/users/find/${id}`)
      .then((res) => {
        setUserProfile(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [location]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-4">
      <div className="ml-auto">
        <LeftSider />
      </div>
      <div className="py-2 col-span-2 flex flex-col border-x-[1px] border-slate-200 border-t-[1px] border-t-slate-200 md:min-w-[55vh] w-full ">
        <>
          <ProfileBox // @ts-ignore
            name={userProfile.username}
            profileDescription={"afdsf"}
            // @ts-ignore
            profilePhoto={userProfile?.profilePicture}
          />
          {userTweet != undefined &&
            userTweet.map((profileTweet, index) => {
              return (
                <div key={index}>
                  <TweetContainer
                    // @ts-ignore
                    profileImage={userProfile?.profilePicture}
                    idNumber={index}
                    editTweet={setUserTweet}
                    tweet={profileTweet}
                  />
                </div>
              );
            })}
        </>
      </div>
      <div className="px-6  hidden lg:block">
        <RightSider />
      </div>
      <div></div>
    </div>
  );
};

export default Profile;
