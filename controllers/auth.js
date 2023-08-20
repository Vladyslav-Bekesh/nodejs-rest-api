const { User } = require("../models/user");
const { ctrlWrapper, HttpError } = require("../helpers");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
  });

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
