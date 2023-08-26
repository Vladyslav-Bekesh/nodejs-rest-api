const express = require("express");
const { validateBody } = require("../../middlewares/validateBody");
const { authenticate } = require("../../middlewares/authenticate");
const { registerSchema, loginSchema } = require("../../models/user");
const { register, login, getCurrent, logout } = require("../../controllers/auth");

const router = express.Router();

router.post("/register", validateBody(registerSchema), register);

router.post("/login", validateBody(loginSchema), login);

router.get("/current", authenticate, getCurrent);

router.get("/logout", authenticate, logout);

module.exports = router;
