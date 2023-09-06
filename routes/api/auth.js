const express = require("express");
const { validateBody, authenticate, upload } = require("../../middlewares");
const { registerSchema, loginSchema } = require("../../models/user");
const {
  register,
  login,
  getCurrent,
  logout,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
} = require("../../controllers/auth");

const router = express.Router();

router.post("/register", validateBody(registerSchema), register);

router.post("/login", validateBody(loginSchema), login);

router.get("/current", authenticate, getCurrent);

router.get("/logout", authenticate, logout);

router.patch("/avatar", authenticate, upload.single("avatar"), updateAvatar);

router.get("/users/verify/:verificationToken", verifyEmail);

router.post("/users/verify", resendVerifyEmail);

module.exports = router;
