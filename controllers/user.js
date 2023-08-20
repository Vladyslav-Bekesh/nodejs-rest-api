const { User } = require("../models/user");
const {  ctrlWrapper } = require("../helpers");

const register = async (req, res) => {
  const newUser = await User.create(req.body)
  console.log(newUser.name);

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  })
}

module.exports = {
  register: ctrlWrapper(register)
}