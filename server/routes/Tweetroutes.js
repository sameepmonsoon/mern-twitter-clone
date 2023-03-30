import express from "express";
import { verifyToken } from "../verifyToken.js";
import {
  createTweet,
  deleteTweet,
  likeOrDislike,
  getAllTweets,
  getUserTweets,
  exploreTweets,
} from "../controllers/tweet.js";

const router = express.Router();
// create tweet
router.post("/", verifyToken, createTweet);

// delete tweet
router.delete("/:id", verifyToken, deleteTweet);

// like or dislike tweet
router.put("/:id/like", verifyToken, likeOrDislike);

// get all timeline tweet
router.get("/timeline/:id", getAllTweets);

// get the user tweet
router.get("/user/all/:id", getUserTweets);

//explore
router.get("/explore", exploreTweets);
export default router;
