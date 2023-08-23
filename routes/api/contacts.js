const express = require("express");

const { validateBody } = require("../../middlewares/validateBody");
const { isValidId } = require("../../middlewares/isValidId");
const { authenticate } = require("../../middlewares/authenticate");
const { addSchema, updateSchema } = require("../../models/contact");

const {
  getAll,
  getById,
  add,
  updateById,
  deleteById,
  updateFavoriteStatus,
} = require("../../controllers/contacts");

const router = express.Router();

router.get("/", authenticate, getAll);

router.get("/:contactId", authenticate, getById);

router.post("/", authenticate, validateBody(addSchema), add);

router.put("/:contactId", authenticate, isValidId, validateBody(updateSchema), updateById);

router.delete("/:contactId", authenticate, isValidId, deleteById);

router.patch("/:contactId", authenticate, isValidId, updateFavoriteStatus);

module.exports = router;
