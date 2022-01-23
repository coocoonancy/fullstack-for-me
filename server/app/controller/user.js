const md5 = require("md5");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const SALT = "!guoyang2022";
const BaseController = require("./base");
const createRule = {
  username: { type: "string" },
  password: { type: "string" },
  captcha: { type: "string" },
  emailcode: { type: "string" },
};
const loginRule = {
  username: { type: "string" },
  password: { type: "string" },
};
class UserController extends BaseController {
  async login() {
    const { ctx, app } = this;
    try {
      ctx.validate(loginRule);
    } catch (e) {
      return this.error("校验失败", -1, e.errors);
    }
    const { username, password, captcha, emailcode } = ctx.request.body;
    // if (captcha.toUpperCase() !== ctx.session.captcha.toUpperCase())
    //   return this.error("验证码错误");
    const user = await ctx.model.User.findOne({
      username,
      password: md5(password + SALT),
    });
    if (!user) return this.error("用户名密码错误");
    console.log(user);
    // 创建token
    const token = jwt.sign(
      {
        id: user.id,
        username,
      },
      app.config.jwt.secret,
      {
        expiresIn: "1h",
      }
    );
    this.success({ token, username });
  }
  async register() {
    const { ctx, app } = this;
    try {
      ctx.validate(createRule);
    } catch (e) {
      return this.error("校验失败", -1, e.errors);
    }
    const { username, password, captcha, emailcode } = ctx.request.body;
    console.log(username, password, captcha, emailcode);
    if (captcha.toUpperCase() !== ctx.session.captcha.toUpperCase())
      return this.error("验证码错误");
    if (emailcode !== ctx.session.emailcode)
      return this.error("邮箱验证码错误");
    if (await this.checkEmail(username)) return this.error("邮箱已存在");
    const res = await ctx.model.User.create({
      id: uuidv4(),
      username,
      password: md5(password + SALT),
    });
    if (res.id) {
      this.message("注册成功");
      this.$router.push("/login");
    }
  }
  async verify() {}
  async info() {
    const { ctx } = this;
    const { username } = ctx.state;
    const user = await this.checkEmail(username);
    this.success(user);
  }
  async checkEmail(username) {
    const user = await this.ctx.model.User.findOne({ username });
    return user;
  }
}
module.exports = UserController;
