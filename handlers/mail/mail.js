const mailer = require("nodemailer");
const { welcome } = require("./utils/welcome_template");
const { purchase } = require("./utils/purchase");
const { resetPass } = require("./utils/reset_pass");
require("dotenv").config({ path: "../../variables.env" });

const getEmailData = (to, name, token, template, actionData) => {
  let data = null;
  switch (template) {
    case "welcome":
      data = {
        from: "waves <codeporan@gmail.com>",
        to,
        subject: `welcome to waves ${name}`,
        html: welcome()
      };
      break;
    case "purchase":
      data = {
        from: "waves <codeporan@gmail.com>",
        to,
        subject: `Thanks for shopping with us ${name}`,
        html: purchase(actionData)
      };
      break;
    case "reset_password":
      data = {
        from: "waves <codeporan@gmail.com>",
        to,
        subject: `Hey ${name}, reset your pass`,
        html: resetPass(actionData)
      };
      break;
    default:
      data;
  }
  return data;
};

const sendMail = async (to, name, token, type, actionData = null) => {
  const smtpTransport = mailer.createTransport({
    service: "Gmail",
    auth: {
      user: "codeporan@gmail.com",
      pass: process.env.EMAIL_PASSWORD
    }
  });
  const mail = getEmailData(to, name, token, type, actionData);
  try {
    const res = await smtpTransport.sendMail(mail);
    console.log(res);
    if (res) {
      smtpTransport.close();
    }
  } catch (err) {
    if (err) return console.log(err);
  }
  //  const res =  smtpTransport.sendMail(mail, function(error, response) {
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       cb();
  //     }
  //     smtpTransport.close();
  //   });
};

module.exports = { sendMail };
