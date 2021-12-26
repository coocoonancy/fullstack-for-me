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
    if (captcha.toUpperCase !== ctx.session.captcha.toUpperCase) {
      return this.error("验证码错误");
    }
    const res = await ctx.model.User.create({
      id,
      username,
      password,
    });
    if (res.id) this.message("注册成功");
  }
  async verify() {}
  async info() {}
}
module.exports = UserController;
