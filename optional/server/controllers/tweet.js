import Tweet from "../models/Tweet.js";
import User from "../models/User.js";
import { handleError } from "../error.js";

export const createTweet = async (req, res, next) => {
  const newTweet = new Tweet(req.body);
  try {
    const savedTweet = await newTweet.save();
    res.status(200).json(savedTweet);
  } catch (err) {
    handleError(500, err);
  }
};
export const deleteTweet = async (req, res, next) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (tweet.userId === req.body.id) {
      await tweet.deleteOne();
      res.status(200).json("Tweet Deleted");
    } else {
      handleError(500, err);
    }
  } catch (err) {
    handleError(500, err);
  }
};
export const likeOrDislike = async (req, res, next) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet.likes.includes(req.body.id)) {
      await tweet.updateOne({
        $push: {
          likes: req.body.id,
        },
      });
      res.status(200).json("You liked the tweet");
    } else {
      await tweet.updateOne({
        $pull: {
          likes: req.body.id,
        },
      });
      res.status(200).json("You Disliked the tweet");
    }
  } catch (err) {
    handleError(500, err);
  }
};
// view all tweets
export const getAllTweets = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.params.id);
    const userTweets = await Tweet.find({ userId: currentUser._id });
    const followersTweets = await Promisel.all(
      currentUser.following.map((followerId) => {
        return Tweet.find({ userId: followerId });
      })
    );

    res.status(200).json(userTweets.concat(...followersTweets));
  } catch (err) {
    handleError(500, err);
  }
};
// view all our tweets
export const getUserTweets = async (req, res, next) => {
  try {
    const userTweets = await Tweet.find({ userId: req.params.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(userTweets);
  } catch (err) {
    handleError(500, err);
  }
};
// view all tweets
export const exploreTweets = async (req, res, next) => {
  try {
    const exploreTweets = await Tweet.find({likes:{$exists:true} }).sort({
      likes: -1,
    });
    res.status(200).json(exploreTweets);
  } catch (err) {
    handleError(500, err);
  }
};
