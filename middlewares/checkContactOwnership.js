const { Contact } = require("../models/contact");

const checkContactOwnership = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;

  try {
    const contact = await Contact.findById(contactId);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    if (contact.owner.toString() !== owner) {
      return res
        .status(403)
        .json({ message: "You are not allowed to modify this contact" });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { checkContactOwnership };
