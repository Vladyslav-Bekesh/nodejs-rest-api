const express = require("express");

const { validateBody } = require("../../middlewares");
const { isValidId } = require("../../middlewares");
const { authenticate } = require("../../middlewares");

const {
  addSchema,
  updateSchema,
  UpdateFavoriteSchema,
} = require("../../models/contact");

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

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(updateSchema),
  updateById
);

router.delete("/:contactId", authenticate, isValidId, deleteById);

router.patch(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(UpdateFavoriteSchema),
  updateFavoriteStatus
);

module.exports = router;
