const sinon = require('sinon');
const { expect } = require('chai').use(require('sinon-chai'));
const Request = require('../helpers/fake-request.js');
const Response = require('../helpers/fake-response.js');
const setConsentCookie = require('../../utils/set-consent-cookie.js');

describe('Utils: set-cookie-consent', () => {
  it('should export a function', () => {
    expect(setConsentCookie).to.be.a('function');
  });

  it('should set cookie name to value', () => {
    const req = new Request();
    const res = new Response(req);
    setConsentCookie(req, res, 'name', 'value');
    expect(res.cookies).to.have.property('name').that.equals('value');
  });

  it('should set cookieChoiceMade in session to true', () => {
    const req = new Request();
    const res = new Response(req);
    req.flash = sinon.stub();
    setConsentCookie(req, res, 'name', 'value');
    expect(req.session).to.have.property('cookieChoiceMade').that.equals(true);
  });

  it('should set secure flag to false by default', () => {
    const req = new Request();
    const res = new Response(req);
    req.flash = sinon.stub();
    setConsentCookie(req, res, 'name', 'value');
    return expect(res.cookieOptions.name.secure).to.be.false;
  });

  it('should set path to passed value', () => {
    const req = new Request();
    const res = new Response(req);
    req.flash = sinon.stub();
    res.cookie = sinon.stub();
    setConsentCookie(req, res, 'name', 'value', '/test-path/');
    expect(res.cookie).to.be.calledWithMatch('name', 'value', sinon.match({
      path: '/test-path/',
    }));
  });

  it('should set secure flag to passed value', () => {
    const req = new Request();
    const res = new Response(req);
    req.flash = sinon.stub();
    setConsentCookie(req, res, 'name', 'value', '/', true);
    return expect(res.cookieOptions.name.secure).to.be.true;
  });
});
