const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "alaina.muller59@ethereal.email",
    pass: "M5nhJaMzDMAQeDsJUy",
  },
});

transporter
  .sendMail({
    from: process.env.EMAIL_FROM,
    to: "taargafederico01@gmail.com",
    text: "bing bong",
  })
  .then((info) => {
    console.log("Preview URL: " + nodemailer.getTestMessageUrl(info));
  })
  .catch((e) => console.error(e));
