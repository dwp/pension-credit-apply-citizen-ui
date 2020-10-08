const sinon = require('sinon');
const proxyquire = require('proxyquire');
const { expect } = require('chai').use(require('sinon-chai'));
const { JourneyContext } = require('@dwp/govuk-casa');
const Request = require('../../../helpers/fake-request.js');
const Response = require('../../../helpers/fake-response.js');

const getOfferedDateOfClaimStub = sinon.stub();
const offeredDateOfClaim = proxyquire('../../../../definitions/hooks/eligibility/offered-claim-date.js', {
  '../../../utils/get-offered-date-of-claim.js': getOfferedDateOfClaimStub,
});

describe('Hooks: common/offered-claim-date', () => {
  it('should export a function', () => {
    expect(offeredDateOfClaim).to.be.a('function');
  });

  it('should call getOfferedDateOfClaim util with journeyContext', () => {
    const context = { test: 'test' };
    const req = new Request(context);
    const res = new Response(req);

    getOfferedDateOfClaimStub.returns('2020-05-05');
    offeredDateOfClaim(req, res, () => {});

    expect(getOfferedDateOfClaimStub).to.be.calledWith(new JourneyContext(context));
  });

  it('should add formatted offeredDateOfClaim to res.locals', () => {
    const req = new Request({});
    const res = new Response(req);

    getOfferedDateOfClaimStub.returns('2020-05-05');
    offeredDateOfClaim(req, res, () => {});

    expect(res.locals).to.have.property('offeredDateOfClaim').that.deep.equals({
      offeredDateOfClaim: '5 May 2020',
    });
  });

  it('should not add offeredDateOfClaim to res.locals if getOfferedDateOfClaim returns null', () => {
    const req = new Request({});
    const res = new Response(req);

    getOfferedDateOfClaimStub.returns(null);
    offeredDateOfClaim(req, res, () => {});

    expect(res.locals).to.not.have.property('offeredDateOfClaim');
  });

  it('should call next', (done) => {
    const req = new Request();
    const res = new Response(req);

    offeredDateOfClaim(req, res, done);
  });
});
