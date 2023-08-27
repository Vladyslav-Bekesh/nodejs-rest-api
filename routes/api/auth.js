const express = require("express");
const { validateBody, authenticate, upload } = require("../../middlewares");
const { registerSchema, loginSchema } = require("../../models/user");
const {
  register,
  login,
  getCurrent,
  logout,
  updateAvatar,
} = require("../../controllers/auth");

const router = express.Router();

router.post("/register", validateBody(registerSchema), register);

router.post("/login", validateBody(loginSchema), login);

router.get("/current", authenticate, getCurrent);

router.get("/logout", authenticate, logout);

router.patch("/avatar", authenticate, upload.single("avatar"), updateAvatar);

module.exports = router;
