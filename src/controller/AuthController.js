const bcrypt = require("bcrypt");
const { find } = require("../models/UserModel");
const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const e = require("express");
const authController = {
  DeleteAll: async (req, res) => {
    const users = await UserModel.deleteMany();
    res.status(201).json("delete");
  },
  allUsers: async (req, res) => {
    const users = await UserModel.find();
    try {
      res.json(users);
    } catch (error) {
      res.json(error);
    }
  },
  register: async (req, res) => {
    const { email, username, password, address, work, profile_picture_path } =
      req.body;

    try {
      const salt = await bcrypt.genSalt();

      const data = {
        username,
        email,
        password,
        address,
        work,
        profile_picture_path,
      };
      console.log(data);
      const hashPassword = await bcrypt.hash(data.password, salt);
      const newUser = new UserModel({
        username,
        email,
        password: hashPassword,
        address,
        work,
        profile_picture_path,
      });
      await newUser.save();
      res.json(newUser);
    } catch (error) {
      res.json(error.message);
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    console.log(process.env.SC);

    try {
      const user = await UserModel.find({ email });
      if (!user) {
        res.status(401).json("No Acc");
      }
      const compare = await bcrypt.compare(password, user.password);
      console.log(user.password);
      if (!compare) {
        res.status(401).json("Worng Password");
      }
      const token = getToken(user);
      return res.status(200).json({ user, token, message: "login success" });
    } catch (error) {
      res.status(400).json(error.message);
    }
  },
};
module.exports = authController;
function getToken(user) {
  return jwt.sign({ data: user }, process.env.SC, { expiredIn: "1h" });
}
