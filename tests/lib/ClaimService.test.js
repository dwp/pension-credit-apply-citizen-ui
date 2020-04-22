const sinon = require('sinon');
const chai = require('chai');
chai.use(require('sinon-chai'));

const { expect } = chai;

const ClaimService = require('../../lib/ClaimService.js');
const fakeLogger = require('../helpers/fake-logger.js')();

describe('ClaimService', () => {
  it('submitClaim() should POST data to the API and log call', () => {
    const apiStub = sinon.stub();
    const spyLog = sinon.spy(fakeLogger, 'info');

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
});
