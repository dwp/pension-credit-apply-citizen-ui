const sinon = require('sinon');
const { expect } = require('chai').use(require('sinon-chai'));
const { waypoints } = require('../../../lib/constants.js');
const Request = require('../../helpers/fake-request.js');
const Response = require('../../helpers/fake-response.js');
const cookieDetailsGet = require('../../../routes/cookies/cookie-details.get.js');

const consentCookieName = 'consent';
const sessionCookieName = 'session';
const sessionTtl = 60;

describe('cookie/cookie-details', () => {
  describe('get', () => {
    it('should be an function', () => {
      expect(cookieDetailsGet).to.be.an.instanceOf(Function);
    });

    it('should return a function', () => {
      expect(cookieDetailsGet()).to.be.an.instanceOf(Function);
    });

    it('should render template with data', () => {
      const route = cookieDetailsGet(waypoints, consentCookieName, sessionCookieName, sessionTtl);
      const req = new Request();
      const res = new Response(req);
      const renderStub = sinon.stub();
      res.render = renderStub;
      route(req, res);
      expect(renderStub).to.be.calledOnceWithExactly('pages/cookies/cookie-details.njk', {
        cookiePolicyUrl: waypoints.COOKIE_POLICY,
        sessionMinutes: sessionTtl / 60,
        consentCookieName,
        sessionCookieName,
      });
    });
  });
});
