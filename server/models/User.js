import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
    },
    followers: {
      type: Array,
      defaultValue: [],
    },

    following: {
      type: Array,
      defaultValue: [],
    },
    description: {
      type: String,
    },
  },
  //   mongodb adds the time of the data created/registered in db
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
