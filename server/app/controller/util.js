'use strict';

const Controller = require('egg').Controller;
const svgCaptcha = require('svg-captcha');
class UtilController extends Controller {
  captcha() {
    const { ctx } = this;
    const captcha = svgCaptcha.create();
    ctx.session.captcha = captcha.text;
    ctx.response.type = 'image/svg+xml';
    ctx.body = captcha.data;
  }
}
module.exports = UtilController;
