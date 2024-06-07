import errorHandler from "../middlewares/errorHandler.js";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

import generateToken from "../utlis/generateToken.js";

const createUser = errorHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username && !email && !password) {
    throw new Error("Please fill up all the inputs");
  }
  const existUsers = await User.findOne({ email });
  if (existUsers) res.status(400).send("User is already existed!!");

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = new User({ username, email, password: hashPassword });
  try {
    await newUser.save();
    generateToken(res, newUser._id);

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(401);
    throw new Error(error.message);
  }
});

export { createUser };
