const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      min: 3,
      max: 10,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    work: {
      type: String,
      required: true,
    },
    profile_picture_path: {
      type: String,
      default: "",
    },
    profile_view: {
      type: Number,
      default: 0,
    },
    impress: {
      type: Number,
      default: 0,
    },
    socail_medai: {
      type: Array,
      default: [],
    },
    friends: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("fb_users", UserSchema);
