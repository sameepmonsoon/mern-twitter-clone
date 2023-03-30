import express from "express";
import {
  getUser,
  update,
  deleteUser,
  followUser,unfollowUser
} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";
const router = express.Router();
// get user
router.get("/find/:id", getUser);
// update user
router.put("/:id", verifyToken, update);

// delete user
router.delete("/:id", verifyToken, deleteUser);

// follow user
router.put("/follow/:id", verifyToken, followUser);

// unfollow user 
router.put("/unfollow/:id",verifyToken,unfollowUser)


export default router;
 