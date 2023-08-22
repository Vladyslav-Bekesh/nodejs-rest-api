const express = require("express");
const { validateBody } = require("../../middlewares/validateBody");
const { registerSchema, loginSchema } = require("../../models/user");
const { register, login } = require("../../controllers/auth");

const router = express.Router();

router.post("/register", validateBody(registerSchema), register);

router.post("/login", validateBody(loginSchema), login);

module.exports = router;
