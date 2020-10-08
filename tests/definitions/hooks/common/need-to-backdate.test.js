const sinon = require('sinon');
const proxyquire = require('proxyquire');
const { expect } = require('chai').use(require('sinon-chai'));
const { JourneyContext } = require('@dwp/govuk-casa');
const Request = require('../../../helpers/fake-request.js');
const Response = require('../../../helpers/fake-response.js');

const needToBackdateUtilStub = sinon.stub();
const needToBackdate = proxyquire('../../../../definitions/hooks/common/need-to-backdate.js', {
  '../../../utils/need-to-backdate.js': needToBackdateUtilStub,
});

describe('Hooks: common/need-to-backdate', () => {
  it('should export a function', () => {
    expect(needToBackdate).to.be.a('function');
  });

  it('should call needToBackdate util with journeyContext', () => {
    const context = { test: 'test' };
    const req = new Request(context);
    const res = new Response(req);

    needToBackdate(req, res, () => {});

    expect(needToBackdateUtilStub).to.be.calledWith(new JourneyContext(context));
  });

  it('should add needToBackdate util return value to res.locals.needToBackdate', () => {
    const req = new Request({});
    const res = new Response(req);

    needToBackdateUtilStub.returns('test-value');
    needToBackdate(req, res, () => {});

    expect(res.locals).to.have.property('needToBackdate').that.equals('test-value');
  });

  it('should call next', (done) => {
    const req = new Request();
    const res = new Response(req);

    needToBackdate(req, res, done);
  });
});
