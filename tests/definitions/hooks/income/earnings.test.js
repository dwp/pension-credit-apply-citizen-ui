const sinon = require('sinon');
const proxyquire = require('proxyquire');
const { expect } = require('chai').use(require('sinon-chai'));
const { JourneyContext } = require('@dwp/govuk-casa');
const Request = require('../../../helpers/fake-request.js');
const Response = require('../../../helpers/fake-response.js');

const getSelfEmploymentVarsStub = sinon.stub();
getSelfEmploymentVarsStub.returns({
  selfEmployedEarningsDate: '2020-01-01',
  selfEmployedSuffix: 'Past',
});
const earningsHook = proxyquire('../../../../definitions/hooks/income/earnings.js', {
  '../../../utils/get-self-employment-vars.js': getSelfEmploymentVarsStub,
});

describe('Hooks: income/earnings', () => {
  it('should export a function', () => {
    expect(earningsHook).to.be.a('function');
  });

  it('should call getSelfEmploymentVars util with journeyContext', () => {
    const context = new JourneyContext({});
    const req = new Request(context);
    const res = new Response(req);

    earningsHook(req, res, () => {});

    expect(getSelfEmploymentVarsStub).to.be.calledWith(new JourneyContext(context));
  });

  it('should add selfEmployedEarningsDate to res.locals', () => {
    const req = new Request({});
    const res = new Response(req);

    earningsHook(req, res, () => {});

    expect(res.locals).to.have.property('selfEmployedEarningsDate').that.deep.equals('1 January 2020');
  });

  it('should add selfEmployedSuffix to res.locals', () => {
    const req = new Request({});
    const res = new Response(req);

    earningsHook(req, res, () => {});

    expect(res.locals).to.have.property('selfEmployedSuffix').that.deep.equals('Past');
  });

  it('should call next', (done) => {
    const req = new Request();
    const res = new Response(req);

    earningsHook(req, res, done);
  });
});
