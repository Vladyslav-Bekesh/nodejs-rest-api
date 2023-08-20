const express = require("express");
const { validateBody } = require("../../middlewares/validateBody");
const { registerSchema } = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(registerSchema));

module.exports = router;
