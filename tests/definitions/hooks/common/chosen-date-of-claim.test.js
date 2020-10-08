const sinon = require('sinon');
const proxyquire = require('proxyquire');
const { expect } = require('chai').use(require('sinon-chai'));
const { JourneyContext } = require('@dwp/govuk-casa');
const Request = require('../../../helpers/fake-request.js');
const Response = require('../../../helpers/fake-response.js');

const getChosenDateOfClaimStub = sinon.stub();
const chosenDateOfClaim = proxyquire('../../../../definitions/hooks/common/chosen-date-of-claim.js', {
  '../../../utils/get-chosen-date-of-claim.js': getChosenDateOfClaimStub,
});

describe('Hooks: common/chosen-date-of-claim', () => {
  it('should export a function', () => {
    expect(chosenDateOfClaim).to.be.a('function');
  });

  it('should call getOfferedDateOfClaim util with journeyContext', () => {
    const context = { test: 'test' };
    const req = new Request(context);
    const res = new Response(req);

    getChosenDateOfClaimStub.returns('2020-05-05');
    chosenDateOfClaim(req, res, () => {});

    expect(getChosenDateOfClaimStub).to.be.calledWith(new JourneyContext(context));
  });

  it('should add formatted chosenDateOfClaim to res.locals', () => {
    const req = new Request({});
    const res = new Response(req);

    getChosenDateOfClaimStub.returns('2020-05-05');
    chosenDateOfClaim(req, res, () => {});

    expect(res.locals).to.have.property('chosenDateOfClaim').that.deep.equals({
      chosenDateOfClaim: '5 May 2020',
    });
  });

  it('should not add chosenDateOfClaim to res.locals if getOfferedDateOfClaim returns null', () => {
    const req = new Request({});
    const res = new Response(req);

    getChosenDateOfClaimStub.returns(null);
    chosenDateOfClaim(req, res, () => {});

    expect(res.locals).to.not.have.property('chosenDateOfClaim');
  });

  it('should call next', (done) => {
    const req = new Request();
    const res = new Response(req);

    chosenDateOfClaim(req, res, done);
  });
});
