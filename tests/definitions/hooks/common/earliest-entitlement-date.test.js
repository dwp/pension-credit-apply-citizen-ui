const sinon = require('sinon');
const proxyquire = require('proxyquire');
const { expect } = require('chai').use(require('sinon-chai'));
const { JourneyContext } = require('@dwp/govuk-casa');
const Request = require('../../../helpers/fake-request.js');
const Response = require('../../../helpers/fake-response.js');

const getEarliestEntitlementDateStub = sinon.stub();
getEarliestEntitlementDateStub.returns('2020-05-05');
const earliestEntitlementDate = proxyquire('../../../../definitions/hooks/common/earliest-entitlement-date.js', {
  '../../../utils/get-earliest-entitlement-date.js': getEarliestEntitlementDateStub,
});

describe('Hooks: common/earliest-entitlement-date', () => {
  it('should export a function', () => {
    expect(earliestEntitlementDate).to.be.a('function');
  });

  it('should call getEarliestEntitlementDate util with journeyContext', () => {
    const context = { test: 'test' };
    const req = new Request(context);
    const res = new Response(req);

    earliestEntitlementDate(req, res, () => {});

    expect(getEarliestEntitlementDateStub).to.be.calledWith(new JourneyContext(context));
  });

  it('should add formatted earliestEntitlementDate to res.locals', () => {
    const req = new Request({});
    const res = new Response(req);

    earliestEntitlementDate(req, res, () => {});

    expect(res.locals).to.have.property('earliestEntitlementDate').that.deep.equals({
      earliestEntitlementDate: '5 May 2020',
    });
  });

  it('should call next', (done) => {
    const req = new Request();
    const res = new Response(req);

    earliestEntitlementDate(req, res, done);
  });
});
