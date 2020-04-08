const chai = require('chai');
const Request = require('../helpers/fake-request.js');
const Response = require('../helpers/fake-response.js');
const nonce = require('../../middleware/nonce.js');

const { expect } = chai;
const cspHeaderName = 'Content-Security-Policy';
const uuidV4 = new RegExp(/[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}/i);

const app = {
  use(mw) {
    this.mw = mw;
  },
};

describe('Middleware: nonce', () => {
  it('should add a middleware function if ENABLE_CSP is true', () => {
    nonce(app, true);
    expect(app.mw).to.be.an.instanceOf(Function);
  });

  it('should add a middleware function if ENABLE_CSP is false', () => {
    nonce(app, false);
    expect(app.mw).to.be.an.instanceOf(Function);
  });

  describe('Production middleware', () => {
    it('should append uuid/v4 nonce to CSP header', () => {
      const req = new Request();
      const res = new Response(req);
      nonce(app, true);

      res.setHeader(cspHeaderName, 'test');

      app.mw(req, res, () => {});
      expect(res.headers[cspHeaderName]).to.match(new RegExp(`test 'nonce-${uuidV4.source}'`, 'i'));
    });

    it('should add uuid/v4 nonce to res.locals', () => {
      const req = new Request();
      const res = new Response(req);
      nonce(app, true);

      app.mw(req, res, () => {});
      expect(res.locals.nonce).to.match(uuidV4);
    });

    it('should call next', (done) => {
      const req = new Request();
      const res = new Response(req);
      nonce(app, true);

      app.mw(req, res, done);
    });
  });

  describe('Non-production middleware', () => {
    it('should remove CSP header', () => {
      const req = new Request();
      const res = new Response(req);
      nonce(app, false);

      res.setHeader(cspHeaderName, 'test');

      app.mw(req, res, () => {});
      expect(res.headers[cspHeaderName]).to.equal(undefined);
    });

    it('should call next', (done) => {
      const req = new Request();
      const res = new Response(req);
      nonce(app, false);

      app.mw(req, res, done);
    });
  });
});
