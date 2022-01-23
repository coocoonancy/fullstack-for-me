const { Service } = require("egg");
const nodemailer = require("nodemailer");
const userEmail = "411060189@qq.com";
const userPass = "ysrjwtxrwfzqbjbb";
const transporter = nodemailer.createTransport({
  service: "QQ",
  secureConnection: true,
  auth: {
    user: userEmail,
    pass: userPass,
  },
});
class ToolService extends Service {
  async sendMail({ text, html, email, subject }) {
    const mailOptions = {
      from: userEmail,
      cc: userEmail,
      to: email,
      subject,
      text,
      html,
    };
    try {
      await transporter.sendMail(mailOptions);
      return true;
    } catch (err) {
      console.error("email error", err);
      return false;
    }
  }
}
module.exports = ToolService;
