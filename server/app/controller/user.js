const md5 = require("md5");
const SALT = "!guoyang2022";
const BaseController = require("./base");
const createRule = {
  username: { type: "string" },
  password: { type: "string" },
  captcha: { type: "string" },
  emailcode: { type: "string" },
};
class UserController extends BaseController {
  async login() {}
  async register() {
    const { ctx } = this;
    try {
      ctx.validate(createRule);
    } catch (e) {
      return this.error("校验失败", -1, e.errors);
    }
    const { username, password, captcha, emailcode } = ctx.request.body;
    console.log(username, password, captcha, emailcode);
    if (captcha.toUpperCase !== ctx.session.captcha.toUpperCase)
      return this.error("验证码错误");
    if (await this.checkEmail(emailcode)) return this.error("邮箱已存在");
    const res = await ctx.model.User.create({
      id,
      username,
      password: md5(password + SALT),
    });
    if (res.id) this.message("注册成功");
  }
  async verify() {}
  async info() {}
  async checkEmail(email) {
    const user = await thid.ctx.model.User.findOne({ email });
    return user;
  }
}
module.exports = UserController;
