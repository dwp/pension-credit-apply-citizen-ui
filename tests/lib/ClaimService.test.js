const sinon = require('sinon');
const chai = require('chai');
chai.use(require('sinon-chai'));

const { expect } = chai;

const ClaimService = require('../../lib/ClaimService.js');
const fakeLogger = require('../helpers/fake-logger.js')();

const spyLog = sinon.spy(fakeLogger, 'info');

describe('ClaimService', () => {
  it('submitClaim() should POST data to the API and log call', () => {
    const apiStub = sinon.stub();

    const claimService = new ClaimService({
      logger: fakeLogger,
      api: apiStub,
    });

    const claim = {};
    claimService.submitClaim(claim);

    expect(apiStub).to.be.calledOnceWithExactly('claims', {
      json: claim,
      method: 'POST',
      responseType: 'json',
    });

    return expect(spyLog).to.be.called;
  });

  it('submitClaim() should POST empty object to the API if given nothing', () => {
    const apiStub = sinon.stub();

    const claimService = new ClaimService({
      logger: fakeLogger,
      api: apiStub,
    });

    claimService.submitClaim();

    expect(apiStub).to.be.calledOnceWithExactly('claims', {
      json: {},
      method: 'POST',
      responseType: 'json',
    });

    return expect(spyLog).to.be.called;
  });

  it('submitClaim() should reject when given a non-object', () => {
    const claimService = new ClaimService({
      logger: fakeLogger,
      api: sinon.stub(),
    });

    const all = [];
    const types = [[], true, false, '', new Set(), () => {}];
    for (let i = 0, l = types.length; i < l; i++) {
      all.push(expect(claimService.submitClaim(types[i])).to.be.rejectedWith(TypeError, 'Claim must be an object'));
    }

    return Promise.all(all);
  });
});
