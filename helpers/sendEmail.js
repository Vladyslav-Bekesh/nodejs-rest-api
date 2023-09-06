const nodemailer = require("nodemailer");
require("dotenv").config();

const { GMAIL_PASSWORD } = process.env;
const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "bekesh.vladyslav@meta.ua",
    pass: GMAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = (data) => {
  const email = {
    email: "bekesh.vladyslav@meta.ua",
    ...data,
  };

  transporter
    .sendMail(email)
    .then((info) => console.log(info))
    .catch((err) => console.log(err));
};

module.exports = { sendEmail };
