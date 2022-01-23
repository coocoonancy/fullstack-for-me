const jwt = require("jsonwebtoken");
module.exports = ({ app }) => {
  return async function verify(ctx, next) {
    if (!ctx.request.header.authorization) {
      ctx.body = {
        status: -666,
        message: "用户没有登录",
      };
      return;
    }
    const token = ctx.request.header.authorization.replace("Bearer ", "");
    try {
      const res = await jwt.verify(token, app.config.secret);
      ctx.state.userid = res.id;
      ctx.state.username = ret.username;
      await next();
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        ctx.body = {
          status: -1,
          message: "用户信息出错",
        };
      } else {
        ctx.body = {
          status: -666,
          message: "登录过期",
        };
      }
    }
  };
};
