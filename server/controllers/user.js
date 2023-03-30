import User from "../models/User.js";
import Tweet from "../models/Tweet.js";
import { handleError } from "../error.js";

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
export const update = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json(updateUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(handleError(403, "You cannot update this account."));
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      await Tweet.remove({  userId: req.params.id });
      res.status(200).json("User Deleted");
    } catch (err) {
      next(err);
    }
  } else {
    return next(handleError(403, "You cannot delete this account."));
  }
};

export const followUser = async (req, res, next) => {
  try {
    // our account
    const user = User.findById(req.params.id);

    // user we want to follow
    const currentUser = await User.findById(req.body.id);

    if (!user.followers.includes(req.body.id)) {
      await user.updateOne({
        $push: { followers: req.body.id },
      });
      await currentUser.updateOne({
        $push: { following: req.params.id },
      });
    } else {
      res.status(403).json("You are Following the user");
    }
    res.status(200).json("Following the user");
  } catch (err) {}
};

export const unfollowUser = async (req, res, next) => {
  try {
    // our account
    const user = User.findById(req.params.id);

    // user we want to follow
    const currentUser = await User.findById(req.body.id);

    if (currentUser.following.includes(req.params.id)) {
      await user.updateOne({
        $pull: { followers: req.body.id },
      });
      await currentUser.updateOne({
        $pull: { followers: req.params.id },
      });
    } else {
      res.status(403).json("You are not Following the user");
    }
    res.status(200).json("UnFollowing the user");
  } catch (err) {}
};
