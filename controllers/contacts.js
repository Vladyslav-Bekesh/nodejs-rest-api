const { HttpError } = require("../helpers/HttpError");
const { ctrlWrapper } = require("../helpers/ctrlWrapper");
const { Contact } = require("../models/contact");

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page, limit } = req.query;
  
  const skip = (page - 1) * limit;
  const data = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email");
  res.json(data);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await Contact.findById({ _id: contactId });

  if (!data || !data.owner.equals(req.user._id)) {
    throw HttpError(404, "Not Found");
  }

  res.json(data);
};

const add = async (req, res, next) => {
  const { _id: owner } = req.user;
  const contact = await Contact.findOne(req.body);

  if (contact) {
    throw HttpError(409, "Name already in use");
  }

  const data = await Contact.create({ ...req.body, owner });

  res.status(201).json(data);
};

const updateById = async (req, res, next) => {
  const {
    params: { contactId },
    body,
  } = req;

  const data = await Contact.findByIdAndUpdate(contactId, body);

  if (!data || !data.owner.equals(req.user._id)) {
    throw HttpError(404, "Not Found");
  }
  res.json(data );
};

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await Contact.findOneAndRemove(contactId);

  if (!data || !data.owner.equals(req.user._id)) {
    throw HttpError(404, "Not Found");
  }

  res.json(data);
};



const updateFavoriteStatus = async (req, res) => {
  if (Object.keys(req.body).length < 1) {
    throw HttpError(400, "missing fields");
  }

  const { contactId } = req.params;

  const data = await Contact.findOneAndUpdate({ _id: contactId }, req.body, {
    new: true,
  });
 
  if (!data || !data.owner.equals(req.user._id)) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json(data);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
  updateFavoriteStatus: ctrlWrapper(updateFavoriteStatus),
};
