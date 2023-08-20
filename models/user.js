const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMogooseError } = require("../helpers");

const userSchema = Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
    minlength: 7,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: String,
});

userSchema.post("save", handleMogooseError);


const registerSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().min(7).required(),
  email: Joi.string().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(7).required(),
  email: Joi.string().required(),
});
 
const User = model("user", userSchema);

module.exports = { User, registerSchema, loginSchema };
