"use strict";

const svgCaptcha = require("svg-captcha");
const BaseController = require("./base");
class UtilController extends BaseController {
  async captcha() {
    const { ctx } = this;
    const captcha = svgCaptcha.create();
    console.log("captcha=>", captcha.text);
    ctx.session.captcha = captcha.text;
    ctx.response.type = "image/svg+xml";
    ctx.body = captcha.data;
  }
}
module.exports = UtilController;
