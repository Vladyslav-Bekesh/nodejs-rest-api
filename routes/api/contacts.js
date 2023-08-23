const express = require("express");

const { validateBody } = require("../../middlewares/validateBody");
const { isValidId } = require("../../middlewares/isValidId");
const { authenticate } = require("../../middlewares/authenticate");
const {
  checkContactOwnership,
} = require("../../middlewares/checkContactOwnership");

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

router.get("/:contactId", authenticate, checkContactOwnership, getById);

router.post("/", authenticate, validateBody(addSchema), add);

router.put(
  "/:contactId",
  authenticate,
  checkContactOwnership,
  isValidId,
  validateBody(updateSchema),
  updateById
);

router.delete(
  "/:contactId",
  authenticate,
  checkContactOwnership,
  isValidId,
  deleteById
);

router.patch(
  "/:contactId",
  authenticate,
  checkContactOwnership,
  isValidId,
  updateFavoriteStatus
);

module.exports = router;
