const { Controller } = require("egg");
class BaseController extends Controller {
  success(data) {
    this.ctx.body = {
      status: 0,
      data,
    };
  }
  message(message) {
    this.ctx.body = {
      status: 0,
      message,
    };
  }
  error(message, status = -1, errors = {}) {
    this.ctx.body = {
      status,
      message,
      errors,
    };
  }
}
module.exports = BaseController;
