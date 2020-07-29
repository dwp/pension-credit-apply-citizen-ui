const { expect } = require('chai');
const { waypoints } = require('../../lib/constants.js');
const Request = require('../helpers/fake-request.js');
const Response = require('../helpers/fake-response.js');
const cookieMessage = require('../../middleware/cookie-message.js');

const mount = '/';
const proxyMount = '/';
const cookieName = 'cookie-name';

describe('Middleware: cookie-message', () => {
  let app;

  beforeEach(() => {
    app = {
      use(mw) {
        this.use = mw;
      },
      post(p, mw) {
        this.all = mw;
      },
    };
  });

  it('should add a "use" middleware', () => {
    cookieMessage(app, cookieName, waypoints, mount, proxyMount);
    expect(app.use).to.be.an.instanceOf(Function);
  });

  it('should add an "all" middleware', () => {
    cookieMessage(app, cookieName, waypoints, mount, proxyMount);
    expect(app.all).to.be.an.instanceOf(Function);
  });

  describe('use: set template options middleware', () => {
    it('should set cookieChoiceMade template variable', () => {
      const req = new Request();
      const res = new Response(req);
      cookieMessage(app, cookieName, waypoints, mount, proxyMount);
      req.session.cookieChoiceMade = true;
      app.use(req, res, () => {});
      expect(res.locals).to.have.property('cookieChoiceMade').that.deep.equals(true);
    });

    it('should clear cookieChoiceMade from session after setting template variable', () => {
      const req = new Request();
      const res = new Response(req);
      cookieMessage(app, cookieName, waypoints, mount, proxyMount);
      req.session.cookieChoiceMade = true;
      app.use(req, res, () => {});
      expect(req.session.cookieChoiceMade).to.equal(undefined);
    });

    it('should add consent cookie value to template variable', () => {
      const req = new Request();
      const res = new Response(req);
      cookieMessage(app, cookieName, waypoints, mount, proxyMount);
      req.cookies[cookieName] = 'test';
      app.use(req, res, () => {});
      expect(res.locals).to.have.property('cookieMessage').that.equals('test');
    });

    it('should default consent cookie template variable to "unset"', () => {
      const req = new Request();
      const res = new Response(req);
      cookieMessage(app, cookieName, waypoints, mount, proxyMount);
      app.use(req, res, () => {});
      expect(res.locals).to.have.property('cookieMessage').that.equals('unset');
    });

    it('should set consent submit URL template variable', () => {
      const req = new Request();
      const res = new Response(req);
      cookieMessage(app, cookieName, waypoints, mount, proxyMount);
      app.use(req, res, () => {});
      expect(res.locals).to.have.property('cookieConsentSubmit').that.equals(waypoints.COOKIE_CONSENT);
    });

    it('should set cookie policy footer URL template variable', () => {
      const req = new Request();
      const res = new Response(req);
      cookieMessage(app, cookieName, waypoints, mount, proxyMount);
      req.originalUrl = '/start';
      app.use(req, res, () => {});
      expect(res.locals).to.have.property('cookiePolicyUrl').that.equals(`${mount}${waypoints.COOKIE_POLICY}?backto=%2Fstart`);
    });

    it('should not double up on backto queries', () => {
      const req = new Request();
      const res = new Response(req);
      cookieMessage(app, cookieName, waypoints, mount, proxyMount);
      req.originalUrl = `${mount}${waypoints.COOKIE_POLICY}?backto=%2Fstart`;
      app.use(req, res, () => {});
      expect(res.locals).to.have.property('cookiePolicyUrl').that.equals(req.originalUrl);
    });

    it('should set strict Referrer-Policy header', () => {
      const req = new Request();
      const res = new Response(req);
      cookieMessage(app, cookieName, waypoints, mount, proxyMount);
      app.use(req, res, () => {});
      expect(res.headers['Referrer-Policy']).to.equal('same-origin');
    });

    it('should call next', (done) => {
      const req = new Request();
      const res = new Response(req);
      cookieMessage(app, cookieName, waypoints, mount, proxyMount);
      app.use(req, res, done);
    });
  });

  describe('all: handle submissions from consent banner', () => {
    it('should set consent cookie if accept', () => {
      const req = new Request();
      const res = new Response(req);
      cookieMessage(app, cookieName, waypoints, mount, proxyMount);
      req.params.cookieMethod = 'accept';
      app.all(req, res, () => {});
      expect(res.cookies).to.have.property(cookieName).that.equals('accept');
    });

    it('should set consent cookie if reject', () => {
      const req = new Request();
      const res = new Response(req);
      cookieMessage(app, cookieName, waypoints, mount, proxyMount);
      req.params.cookieMethod = 'accept';
      app.all(req, res, () => {});
      expect(res.cookies).to.have.property(cookieName).that.equals('accept');
    });

    it('should not set consent cookie if not accept or reject', () => {
      const req = new Request();
      const res = new Response(req);
      cookieMessage(app, cookieName, waypoints, mount, proxyMount);
      req.params.cookieMethod = 'bad';
      app.all(req, res, () => {});
      expect(res.cookies).to.not.have.property(cookieName);
    });

    it('should redirect back to Referrer path', () => {
      const req = new Request();
      const res = new Response(req);
      req.headers.Referrer = '/claims/page';
      cookieMessage(app, cookieName, waypoints, mount, proxyMount);
      app.all(req, res, () => {});
      expect(res.redirectedTo).to.equal('/claims/page');
    });

    it('should redirect back to only path on this domain', () => {
      const req = new Request();
      const res = new Response(req);
      req.headers.Referrer = 'http://other-domain/claims/page';
      cookieMessage(app, cookieName, waypoints, mount, proxyMount);
      app.all(req, res, () => {});
      expect(res.redirectedTo).to.equal('/claims/page');
    });

    it('should redirect to / if referrer starts with "javascript:"', () => {
      const req = new Request();
      const res = new Response(req);
      /* eslint-disable-next-line no-script-url */
      req.headers.Referrer = 'javascript:alert(1)';
      cookieMessage(app, cookieName, waypoints, mount, proxyMount);
      app.all(req, res, () => {});
      expect(res.redirectedTo).to.equal('/');
    });
  });
});
