"use strict";

const svgCaptcha = require("svg-captcha");
const BaseController = require("./base");
const fse = require("fs-extra");
class UtilController extends BaseController {
  async captcha() {
    const { ctx } = this;
    const captcha = svgCaptcha.create();
    console.log("captcha=>", captcha.text);
    ctx.session.captcha = captcha.text;
    ctx.response.type = "image/svg+xml";
    ctx.body = captcha.data;
  }
  async uploadfile() {
    const { ctx } = this;
    const file = ctx.request.files[0];
    const { name } = ctx.request.body;
    console.log(name, file);
    // 将文件移到public
    await fse.move(file.filepath, this.config.UPLOAD_DIR + "/" + file.filename);
    this.success({
      url: "/pubilc" + file.filename,
    });
  }
  async sendcode() {
    const { ctx } = this;
    const email = ctx.query.username;
    const code = Math.random().toString().slice(2, 6);
    ctx.session.emailcode = code;
    const subject = "南希的邮箱验证码";
    const text = "";
    const html = `<span>${code}</span>`;
    console.log({ email, subject, text, html });
    const isSend = await this.service.tool.sendMail({
      email,
      subject,
      text,
      html,
    });
    if (isSend) this.message("发送成功");
    else this.error("发送失败");
  }
}
module.exports = UtilController;
