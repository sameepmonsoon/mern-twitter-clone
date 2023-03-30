import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { handleError } from "../error.js";

export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    // we are hashing the password
    const hash = bcrypt.hashSync(req.body.password, salt);
    //we are creating new user in db with all the form-post data and passing the hashed password along with it

    const newUser = new User({ ...req.body, password: hash });
    //saving the new user in db
    await newUser.save();
    // mongo db assigns id as _id for each user
    // we are creating a token and sending it to the browser
    const token = jwt.sign({ id: newUser._id }, process.env.JWT);
    // destructure the mongodb data
    //we are extracting password and only passing other data
    const { password, ...others } = newUser._doc;
    // we have a cookie while signing in
    // now we can respond with the particular cookie
    res
      .cookie("access-token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(...others);
  } catch (error) {
    next(error);
  }
};
export const signin = async (req, res, next) => {
  try {
    // getting the username from singin
    const user = await User.findOne({
      username: req.body.username,
    });
    if (!user) return next(handleError(404, "User Not Found"));
    // checking if the password matches with the respec user or not
    const isPassCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPassCorrect) return next(handleError(400, " Wrong Password"));
    const token = jwt.sign({ id: user._id }, process.env.JWT);
    const { password, ...others } = user._doc;
    res
      .cookie("access token", token, { httpOnly: true })
      .status(200)
      .json(others);
  } catch (error) {
    next(error);
  }
};
