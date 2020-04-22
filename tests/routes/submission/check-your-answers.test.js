const proxyquire = require('proxyquire');
const sinon = require('sinon');
const chai = require('chai');
chai.use(require('sinon-chai'));
const Request = require('../../helpers/fake-request.js');
const Response = require('../../helpers/fake-response.js');

const { expect } = chai;
const stubBuildClaim = sinon.stub().returns({});

const {
  checkLock,
  applyLock,
  submitClaim,
  clearSession,
  handleErrors,
} = proxyquire('../../../routes/submission/check-your-answers.js', {
  '../../lib/build-claim.js': stubBuildClaim,
});

describe('submission/check-your-answers', () => {
  /* -------------------------------------------------------------- checkLock */

  describe('checkLock()', () => {
    it('should call next middleware when no submission lock is present', () => {
      const req = new Request();
      const res = new Response();
      const next = sinon.stub();

      checkLock(req, res, next);

      expect(next).to.be.calledOnceWithExactly();
    });

    it('should call next middleware when submission lock has expired', () => {
      const req = new Request();
      req.session.submissionLock = (new Date()).getTime() - (10 * 1000);
      const res = new Response();
      const next = sinon.stub();

      checkLock(req, res, next);

      expect(next).to.be.calledOnceWithExactly();
    });

    it('should render the check-your-answers template when submission lock has not expired', () => {
      const req = new Request();
      req.session.submissionLock = (new Date()).getTime() + (10 * 1000);
      const res = new Response();
      const renderSpy = sinon.spy(res, 'render');

      checkLock(req, res, () => {});

      expect(renderSpy).to.be.calledOnceWithExactly('pages/submission/check-your-answers.njk', {
        error: 'check-your-answers:error.submission-locked',
      });
    });
  });

  /* -------------------------------------------------------------- applyLock */

  describe('applyLock()', () => {
    let _getTime;

    before(() => {
      _getTime = Date.prototype.getTime;
      Date.prototype.getTime = () => (0); /* eslint-disable-line no-extend-native */
    });

    after(() => {
      Date.prototype.getTime = _getTime; /* eslint-disable-line no-extend-native */
    });

    it('should set a submission lock timer in the session and call next handler', () => {
      const req = new Request();
      const res = new Response();
      const next = sinon.stub();
      const timeout = 10;

      applyLock(timeout)(req, res, next);

      expect(req.session).to.have.property('submissionLock').that.equals(timeout * 1000);
      expect(next).to.be.calledOnceWithExactly();
    });

    it('should call next handler with error when session fails to save', () => {
      const req = new Request();
      req.session.save = sinon.stub().callsFake((cb) => cb('test-error'));
      const res = new Response();
      const next = sinon.stub();

      applyLock(10)(req, res, next);

      expect(next).to.be.calledOnceWithExactly('test-error');
    });
  });

  /* ------------------------------------------------------------ submitClaim */

  describe('submitClaim()', () => {
    it('should create a claim service instance with a trace ID', async () => {
      const claimService = { submitClaim: sinon.stub().resolves() };
      const claimServiceFactory = { create: sinon.stub().returns(claimService) };

      const req = new Request();
      req.request_correlation_id = 'test-trace-id';
      const res = new Response();
      const next = sinon.stub();

      await submitClaim(claimServiceFactory)(req, res, next);

      expect(claimServiceFactory.create).to.be.calledOnceWithExactly(sinon.match({
        traceId: 'test-trace-id',
      }));
    });

    it('should call the next middleware on successful claim submission', (done) => {
      const claimService = { submitClaim: sinon.stub().resolves() };
      const claimServiceFactory = { create: sinon.stub().returns(claimService) };

      const req = new Request();
      const res = new Response();
      const next = sinon.stub();

      submitClaim(claimServiceFactory)(req, res, next).then(() => {
        process.nextTick(() => {
          expect(next).to.be.calledOnceWithExactly();
          done();
        });
      }).catch(done);
    });

    it('should call the next middleware with an error on unsuccessful claim submission', async () => {
      const claimService = { submitClaim: sinon.stub().rejects({ message: 'test' }) };
      const claimServiceFactory = { create: sinon.stub().returns(claimService) };

      const req = new Request();
      const res = new Response();
      const next = sinon.stub();

      await submitClaim(claimServiceFactory)(req, res, next);

      expect(next).to.be.calledOnceWithExactly(sinon.match({ message: 'test' }));
    });
  });

  /* ----------------------------------------------------------- clearSession */

  describe('clearSession', () => {
    it('should redirect to the final URL on successful clearing', (done) => {
      const endSession = sinon.stub().resolves();
      const finalUrl = 'test-url';

      const req = new Request();
      const res = new Response();
      const spyStatus = sinon.spy(res, 'status');
      const spyRedirect = sinon.spy(res, 'redirect');
      const next = sinon.stub();

      clearSession(endSession, finalUrl)(req, res, next).then(() => {
        process.nextTick(() => {
          expect(spyStatus).to.be.calledOnceWithExactly(302);
          expect(spyRedirect).to.be.calledOnceWithExactly(finalUrl);
          done();
        });
      }).catch(done);
    });

    it('should call the next middleware with an error on unsuccessful clearing', async () => {
      const endSession = sinon.stub().rejects({ message: 'test-error' });

      const req = new Request();
      const res = new Response();
      const next = sinon.stub();

      await clearSession(endSession, '')(req, res, next);

      expect(next).to.be.calledOnceWithExactly(sinon.match({ message: 'test-error' }));
    });
  });

  /* ----------------------------------------------------------- handleErrors */

  describe('handleErrors', () => {
    it('should render the check-you-answers template with an error', () => {
      const req = new Request();
      const res = new Response();
      const spyRender = sinon.spy(res, 'render');
      const next = sinon.stub();

      handleErrors({}, req, res, next);

      expect(spyRender).to.be.calledOnceWithExactly('pages/submission/check-your-answers.njk', {
        error: 'check-your-answers:error.claim-service-failure',
      });
    });
  });
});
