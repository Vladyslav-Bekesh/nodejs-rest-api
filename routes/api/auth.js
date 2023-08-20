const express = require("express");
const { validateBody } = require("../../middlewares/validateBody");
const { registerSchema } = require("../../models/user");
const { register } = require("../../controllers/auth");

const router = express.Router();

router.post("/register", validateBody(registerSchema), register);

module.exports = router;