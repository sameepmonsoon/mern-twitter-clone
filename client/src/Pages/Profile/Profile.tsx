import React, { useState, useEffect } from "react";
import ProfileBox from "../../Components/ProfileBox/ProfileBox";
import LeftSider from "../../Page Components/LeftSider/LeftSider";
import MainTweet from "../../Page Components/Main Tweet/MainTweet";
import RightSider from "../../Page Components/RightSider/RightSider";
import { useSelector, useDispatch } from "react-redux";

import { useParams } from "react-router-dom";
import { HTTPMethods } from "../../Utils/HTTPMethods";
import TweetContainer from "../../Components/TweetContainer/TweetContainer";
const Profile = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  const [userTweet, setUserTweet] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    HTTPMethods.get(`/tweets/user/all/${id}`)
      .then((res) => {
        setUserTweet(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentUser._id]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-4">
      <LeftSider />
      <div className="py-10 px-6 col-span-2 flex flex-col border-x-[1px] border-slate-200 border-t-[1px] border-t-slate-200 ">
        <>
          <ProfileBox
            name={currentUser.username}
            profileDescription={"afdsf"}
          />
          {userTweet != undefined &&
            userTweet.map((profileTweet, index) => {
              return (
                <div key={index}>
                  <TweetContainer
                    idNumber={index}
                    editTweet={setUserTweet}
                    tweet={profileTweet}
                  />
                </div>
              );
            })}

          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio alias
            ipsam ipsa vel esse soluta? Numquam temporibus, maxime sapiente quos
            sint dolorem esse nobis similique. Adipisci minus nemo assumenda
            ipsam!
          </div>
        </>
      </div>
      <div className="px-6">
        <RightSider />
      </div>
    </div>
  );
};

export default Profile;
