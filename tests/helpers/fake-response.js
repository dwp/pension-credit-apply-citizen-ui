const Request = require('./fake-request.js');

module.exports = class Response {
  constructor(request) {
    this.req = request || new Request();
    this.statusCode = 200;
    this.headers = {};
    this.locals = {
      casa: {
        mountUrl: '/',
      },
    };
  }

  get(name) {
    return this.headers[name];
  }

  setHeader(name, value) {
    this.headers[name] = value;
    return this;
  }

  removeHeader(name) {
    delete this.headers[name];
    return this;
  }

  redirect(url) {
    this.redirectedTo = url;
    return this;
  }

  render(view, data) {
    this.rendered = { view, data };
    return this;
  }

  status(statusCode) {
    this.statusCode = statusCode;
    return this;
  }
};
