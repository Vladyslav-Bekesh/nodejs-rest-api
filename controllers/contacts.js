const { HttpError, ctrlWrapper } = require("../helpers");
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
  const { _id: owner } = req.user;
  const data = await Contact.findOne({ _id: contactId, owner });

  if (!data) {
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
  // const filter = { contactId:req.params.contactId, owner:req.user };
  console.log(req.user);
  console.log(req.params);

  const {
    params: { contactId },
    body,
  } = req;

  const data = await Contact.findByIdAndUpdate(contactId, body);

  // if (!data || !data.owner.equals(req.user._id)) {
  //   throw HttpError(404, "Not Found");
  // }
  res.json(data);
};

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;

  const data = await Contact.findOneAndRemove({
    _id: contactId,
    owner: req.user._id,
  });

  if (!data) {
    throw HttpError(404, "Not Found");
  }

  res.json(data);
};

const updateFavoriteStatus = async (req, res) => {
  const { contactId } = req.params;
  
  const data = await Contact.findOneAndUpdate(
    { _id: contactId, owner: req.user._id },
    req.body,
    {
      new: true,
    }
  );

  if (!data) {
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
