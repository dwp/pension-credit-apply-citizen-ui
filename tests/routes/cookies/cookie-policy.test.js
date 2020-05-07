const sinon = require('sinon');
const { expect } = require('chai').use(require('sinon-chai'));
const { waypoints, CONSENT_COOKIE_NAME } = require('../../../lib/constants.js');
const Request = require('../../helpers/fake-request.js');
const Response = require('../../helpers/fake-response.js');
const cookiePolicyGet = require('../../../routes/cookies/cookie-policy.get.js');
const cookiePolicyPost = require('../../../routes/cookies/cookie-policy.post.js');

describe('cookies/cookie-policy', () => {
  describe('get', () => {
    it('should be an function', () => {
      expect(cookiePolicyGet).to.be.an.instanceOf(Function);
    });

    it('should return a function', () => {
      expect(cookiePolicyGet()).to.be.an.instanceOf(Function);
    });

    it('should render template with data', () => {
      const route = cookiePolicyGet(waypoints);
      const req = new Request();
      const res = new Response(req);
      const renderStub = sinon.stub();
      res.render = renderStub;
      route(req, res);
      expect(renderStub).to.be.calledOnceWithExactly('pages/cookies/cookie-policy.njk', {
        cookieDetailsUrl: waypoints.COOKIE_DETAILS,
        formErrorsGovukArray: undefined,
        formErrors: undefined,
      });
    });

    it('should render template with data including errors if in session', () => {
      const route = cookiePolicyGet(waypoints);
      const req = new Request();
      const res = new Response(req);
      const renderStub = sinon.stub();
      res.render = renderStub;
      res.locals.t = (k) => k;
      req.session.cookieConsentError = 'error';
      route(req, res);
      expect(renderStub).to.be.calledOnceWithExactly('pages/cookies/cookie-policy.njk', {
        cookieDetailsUrl: waypoints.COOKIE_DETAILS,
        formErrorsGovukArray: [{
          text: 'error',
          href: '#f-cookieConsent',
        }],
        formErrors: {
          cookieConsent: [{
            summary: 'error',
            inline: 'error',
          }],
        },
      });
    });

    it('should clear error from session', () => {
      const route = cookiePolicyGet(waypoints);
      const req = new Request();
      const res = new Response(req);
      const renderStub = sinon.stub();
      res.render = renderStub;
      res.locals.t = (k) => k;
      req.session.cookieConsentError = 'error';
      route(req, res);
      expect(req.session.cookieConsentError).to.equal(undefined);
    });
  });

  describe('post', () => {
    it('should be an function', () => {
      expect(cookiePolicyPost).to.be.an.instanceOf(Function);
    });

    it('should return a function', () => {
      expect(cookiePolicyPost(CONSENT_COOKIE_NAME)).to.be.an.instanceOf(Function);
    });

    it('should add error to session and redirect back if req.body.cookieConsent is undefined', () => {
      const route = cookiePolicyPost(CONSENT_COOKIE_NAME);
      const req = new Request();
      const res = new Response(req);
      req.originalUrl = 'test';
      route(req, res);
      expect(req.session.cookieConsentError).to.equal('cookie-policy:field.cookieConsent.required');
      expect(res.redirectedTo).to.equal('test');
    });

    it('should add error to session and redirect back if req.body.cookieConsent is not accept or reject', () => {
      const route = cookiePolicyPost(CONSENT_COOKIE_NAME);
      const req = new Request();
      const res = new Response(req);
      req.originalUrl = 'test';
      req.body.cookieConsent = 'wrong';
      route(req, res);
      expect(req.session.cookieConsentError).to.equal('cookie-policy:field.cookieConsent.required');
      expect(res.redirectedTo).to.equal('test');
    });

    it('should update consent cookie if req.body.cookieConsent is accept or reject', () => {
      const route = cookiePolicyPost(CONSENT_COOKIE_NAME);
      const req = new Request();
      const res = new Response(req);
      req.body.cookieConsent = 'accept';
      route(req, res);
      expect(res.cookies).to.have.property(CONSENT_COOKIE_NAME).that.equals('accept');
    });

    it('should redirect back to backto query URL if present', () => {
      const route = cookiePolicyPost(CONSENT_COOKIE_NAME);
      const req = new Request();
      const res = new Response(req);
      req.body.cookieConsent = 'accept';
      req.query.backto = 'http://localhost/start';
      route(req, res);
      expect(res.redirectedTo).to.equal('/start');
    });

    it('should remove consecutive slashes from backto URL', () => {
      const route = cookiePolicyPost(CONSENT_COOKIE_NAME);
      const req = new Request();
      const res = new Response(req);
      req.body.cookieConsent = 'accept';
      req.query.backto = 'http://localhost/claims////start';
      route(req, res);
      expect(res.redirectedTo).to.equal('/claims/start');
    });

    it('should remove . and : form backto URL', () => {
      const route = cookiePolicyPost(CONSENT_COOKIE_NAME);
      const req = new Request();
      const res = new Response(req);
      req.body.cookieConsent = 'accept';
      req.query.backto = '/claims/:start.';
      route(req, res);
      expect(res.redirectedTo).to.equal('/claims/start');
    });

    it('should redirect back to originalUrl if backto query is not present', () => {
      const route = cookiePolicyPost(CONSENT_COOKIE_NAME);
      const req = new Request();
      const res = new Response(req);
      req.body.cookieConsent = 'accept';
      req.originalUrl = 'test';
      route(req, res);
      expect(res.redirectedTo).to.equal('test');
    });
  });
});
