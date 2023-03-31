import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TweetContainer from "../../Components/TweetContainer/TweetContainer";
import { HTTPMethods } from "../../Utils/HTTPMethods";
const TimelineTweet = () => {
  const [timeLine, setTimeLine] = useState([]);
  const { currentUser } = useSelector((state: any) => state.user);
  useEffect(() => {
    const fetchTweet = async () => {
      await HTTPMethods.get(`/tweets/timeline/${currentUser._id}`)
        .then((res) => {
          console.log("in the response", res.data);
          setTimeLine(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchTweet();
  }, [currentUser._id]);
  return (
    <div>
      <TweetContainer />
      {timeLine != null &&
        timeLine.map((tweet: { _id: number }, index) => {
          return (
            <div key={index}>
              <TweetContainer
                idNumber={tweet._id}
                tweet={tweet}
                editTweet={setTimeLine}
              />
            </div>
          );
        })}
    </div>
  );
};

export default TimelineTweet;
